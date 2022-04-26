import chalk from "chalk"


export default async function (ctx, next) {
    const { method, url, header } = await ctx.request

    console.log([
        ctx.response.status,
        chalk.bold.cyan(`${method}`),
        chalk.dim(url),
        chalk.blue(`${header.host}`),
    ].join(" "))

    return await next()
}
