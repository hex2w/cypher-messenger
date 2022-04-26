import chalk from "chalk"


export default async function (socket, io) {
    socket.on("message", msg => {
        console.log(`${chalk.dim(socket.id)}: ${msg.content}`)
        io.emit("message", {
            author: socket.id,
            content: msg.content,
        })
    })
}
