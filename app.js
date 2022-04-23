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

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`)
    socket.on("message", (message) => {
      console.log(message)
      io.emit("message", `${socket.id.substring(0, 1)}: ${message}`)
    })
  
    socket.on("disconnect", (_) => console.log(`user ${socket.id} disconnected`))
})

server
      .use(compose(middleware))
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(3000)
