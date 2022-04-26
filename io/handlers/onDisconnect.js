export default async function (socket, io) {
    socket.on("disconnect", reason => {
        console.log(`user ${socket.id} disconnected (${reason})`)
    })
}
