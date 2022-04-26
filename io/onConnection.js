import chalk from "chalk"
import handlers from "./handlers"


export default async function (socket, io) {
    console.log(`user ${chalk.cyan(socket.id)} connected`)

    // register all event handlers
    handlers.forEach(handler => {
        handler(socket, io)
    })
}
