import { ref, h } from "vue"
import { useEmitter } from "@/composables"


function getMsgVnode(props) {
    if (props.type === "plain") {
        return h("div", { class: "bg-slate-50" })
    }
}

export default {
    setup() {
        const emitter = useEmitter()

        const messages = ref([
            {
                type: "plain",
                content: "Lorem Ipsum",
                timestamp: "2022-04-22T21:47:48+0000",
            },
            {
                type: "plain",
                content: "Dolorm Sit Amet",
                timestamp: "2022-04-22T21:53:54+0000",
            },
        ])
        const isLoading = true

        emitter.on( "receive:message", msg => messages.value.push(msg) )


        // render function
        return _ => h("div", {
            // props & attributes
            id: "messages"
        }, [
            // children
            messages.value.map(el => getMsgVnode(el))
        ])
    }
}
