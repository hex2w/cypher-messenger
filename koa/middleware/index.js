import compose from "koa-compose"
import cors from "./cors.js"
import logger from "./logger.js"


export default compose([
    cors,
    logger,
])
