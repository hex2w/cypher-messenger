import chalk from "chalk"


export default async function (ctx, next) {
    const { method, url, header } = ctx.request

    console.log([
        statusColor(ctx.response.status),
        "|",
        chalk.bold.cyan(`${method}`),
        chalk.dim(url),
        chalk.blue(`${header.host}`),
    ].join(" "))


    await next()
}
