import { parseRequestUrl } from "../utils/index.js"

const OrdersScreen = {
    after_render: async() => {},
    render: async () => {
        const url = parseRequestUrl()
        

        return `<div>Orders Screen</div>`
    }
}

export default OrdersScreen