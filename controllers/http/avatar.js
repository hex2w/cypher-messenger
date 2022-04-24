import Router from "@koa/router"
import multer from "@koa/multer"


const avatar = new Router({ prefix: "/avatar" })
const upload = multer()


avatar.get("/:id", ctx => {
    return {
        url: `${config.protocol || "http"}://${config.host}/${ctx.params.id}`
    }
})

avatar.post(
    "/upload",
    upload.single("avatar"),
    ctx => {
        console.log("(upload)", ctx.request.file.filename)

        ctx.body = "Success"
    }
)
