import { OutgoingMessage } from "http"
import { Server } from "socket.io"


export default class extends Server {
    /**
     * Extends the socket.io Server class with some additional setup.
     * 
     * The default path is now `/socket`. Also setups `koa-session` for
     * use as middleware.
     */

    constructor(koaApp) {
        super(koaApp.server, {
            path: "/socket"
        })

        // setup sessions for WebSocket services
        this.use((socket, next) => {
            try {
                // create new Koa context from the socket's request so we can decrypt the session cookie
                const ctx = koaApp.createContext( socket.request, new OutgoingMessage() )
                socket.session = ctx.session

                return next()
            } catch (err) { return next(err) }
        })
    }
}
