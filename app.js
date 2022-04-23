import Koa from "koa"
import Router from "@koa/router"
import Cors from "@koa/cors"
import compose from "koa-compose"
import { Server } from "socket.io"
import middleware from "./middleware"


const server = new Koa()
const io = new Server(server)
const router = new Router()


io.on("connection", socket => {
    socket.emit("hello", "hello world")

    socket.on("hi", arg => {
        console.log(arg)
    })

    socket.on("disconnect", _ => console.log("user disconnected") )
})


server.use(router.routes())
      .use(router.allowedMethods())
      .listen(3000)
