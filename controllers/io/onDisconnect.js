export default async function (socket, next) {
    socket.on("disconnect", _ => console.log(`user ${socket.id} disconnected`))

    await next()
}
