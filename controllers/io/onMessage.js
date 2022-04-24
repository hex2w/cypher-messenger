export default async function (socket, next) {
    socket.on("message", msg => {
        console.log(msg)
        socket.emit("message", `${socket.id.substring(0, 1)}: ${msg}`)
    })

    await next()
}
