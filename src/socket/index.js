import { io } from "socket.io-client"
import { useEmitter } from "@/composables/useEmitter.js"


const socket = io(socketUrl)
const emitter = useEmitter()


// listen to all events, send everything to server
emitter.on( "*", (type, e) => socket.emit(type, e) )
