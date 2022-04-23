import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"


export default defineConfig({
    define: {
        socketUrl: JSON.stringify("ws://apiurl.com")
    },
    resolve: {
        alias: { "@": resolve(__dirname, "./src") },
    },
    plugins: [ vue() ],
})
