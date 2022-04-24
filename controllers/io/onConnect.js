export default async function (socket, next) {
    console.log(`user ${socket.id} connected`)

    await next()
}
