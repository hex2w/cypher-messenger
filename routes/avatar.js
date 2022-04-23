import Router from "@koa/router"


const avatar = new Router({
    prefix: "/avatar"
})


avatar.get("/:id", ctx => {
    return { url: `https://example.com/avatar-${ctx.params.id}.jpg` }
})
