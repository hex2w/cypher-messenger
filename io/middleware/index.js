import logger from "./logger.js"


export default async function (io) {
    [
        logger,
    ].forEach( middleware => io.use( middleware ) )
}
