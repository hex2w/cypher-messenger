import http from "http"
import https from "https"
import { readFileSync } from "fs"
import Koa from "koa"
import session from "koa-session"

import config from "../config.js"


export default class extends Koa {
    /**
     * Extends the Koa class with some additional setup.
     * 
     * Extends the Koa class manually creating the http server under
     * `instance.server` so Socket.io can be used. If the "https"
     * protocol is set in config, setups an https server instead.
     * Also setups sessions.
     */

    constructor() {
        super()

        // setup sessions for REST services
        this.keys = [ config.secret ]
        this.use(session({}, this))

        // manually create the http server
        if (config.protocol === "https" && config.key && config.cert) {
            try {
                this.server = https.createServer({
                    key: readFileSync(config.key),
                    cert: readFileSync(config.cert),
                }, this.callback())
            } catch (err) {
                console.log("Unable to create the server with provided key and certificate!", err)
            }
        } else {
            this.server = http.createServer( this.callback() )
        }
    }

    // override parent's method
    // we need to do this because we created the http server manually
    listen(... [ port, ...args ]) {
        this.server.listen.call(this.server, ...[ port, ...args ])
        console.log(`listening on *:${port}`)

        return this.server
    }
}
