import { GetAllOrdersFromDatabase, getUserInfo } from '../api/localStorage.js'

const OrdersScreen = {
	after_render: async () => {},
	render: async () => {
        const info =  getUserInfo()
        console.log(info)

        if(!info.token) return document.location.hash = '/sign-in'

		await GetAllOrdersFromDatabase()

		return `<div class="page-title">Your Orders</div>

        <div class="orders-grid">
        ${ Orders && Orders.map((order) => {
          return Order.render({ id: order._id, ...order })
        })}
        </div>
        `
	},
}

export default OrdersScreen
