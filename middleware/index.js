import compose from "koa-compose"
import logger from "./logger.js"

export default compose([
    logger,
])
