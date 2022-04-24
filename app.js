import http from "http"
import https from "https"
import { readFileSync } from "fs"
import Koa from "koa"
import Router from "@koa/router"
import cors from "@koa/cors"
import session from "koa-session"
import { Server } from "socket.io"

import config from "./config.js"
import middleware from "./middleware/"
import socketMiddleware from "./controllers/io"
import httpMiddleware from "./middleware/http"


const app = new Koa()

// setup sessions for REST services
app.keys = [ config.secret ]
app.use(session({}, app))


// manually create the http server
if (config.protocol === "https" && config.key && config.cert) {
    try {
        app.server = https.createServer({
            key: readFileSync(config.key),
            cert: readFileSync(config.cert),
        }, app.callback())
    } catch (err) {
        console.log("Unable to create the server with provided key and certificate!", err)
    }
} else {
    app.server = http.createServer( app.callback() )
}

// override app.listen
app.listen = (...args) => {
    app.server.listen.call(app.server, ...args)
    return app.server
}

// create a socket.io instance
app.io = new Server(app.server)



/***
 * MIDDLEWARE
 **/

// setup REST routing
const router = new Router()
app.use( router.routes() )
    .use( router.allowedMethods() )

// setup CORS
app.use( cors({ origin: "*" }) )

app.use( middleware )
//    .use( httpMiddleware )
app.io.use( socketMiddleware )

// setup sessions for WebSocket services
app.io.use((socket, next) => {
    try {
        // create new Koa context from the socket's request so we can decrypt the session cookie
        const ctx = app.createContext( socket.request, new http.OutgoingMessage() )
        socket.session = ctx.session

        return next()
    } catch (err) { return next(err) }
})



app.io.on("connection", socket => {
    // run all middleware functions with socket and io as args
    console.log("client connected")
    socket.on("message", msg => console.log(msg))
})

app.listen(config.port, _ => {
    console.log(`listening on *:${config.port}`)
})
