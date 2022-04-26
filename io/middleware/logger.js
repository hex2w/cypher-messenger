import chalk from "chalk"


export default async function (socket, next) {
    const { url, address } = socket.handshake

    console.log([
        chalk.dim(url),
        chalk.blue(`${address}`),
    ].join(" "))

    return await next()
}
