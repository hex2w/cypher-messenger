import Koa from "./lib/koa.js"
import IO from "./lib/io.js"

import config from "./config.js"
import koaMiddleware from "./koa/middleware"
import useIOMiddleware from "./io/middleware"
import onConnection from "./io/onConnection.js"


const app = new Koa()

app.io = new IO(app)


// use Koa middleware
app.use( koaMiddleware )

// use socket.io middleware
useIOMiddleware(app.io)

// register socket.io handlers
app.io.on("connection", socket => onConnection(socket, app.io))


app.listen(config.port)
