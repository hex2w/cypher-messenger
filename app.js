import Koa from "koa"
import { Server } from "socket.io"
import { logger } from "middleware"


const server = new Koa()
const io = new Server(server)

io.on("connection", socket => {
    socket.emit("hello", "hello world")

    socket.on("hi", arg => {
        console.log(arg)
    })

    socket.on("disconnect", _ => console.log("user disconnected") )
})

server.listen(3000)
