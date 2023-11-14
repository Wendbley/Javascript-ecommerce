import { getQtyFromCartItems } from '../api/localStorage.js'
import { formatCurrency } from '../scripts/utils/money.js'

const PaymentSummary = {
	render: async (props) => {
		const { price, subtotal, Shipping, tax, total } = props
        
		return `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div class='js-summary-qty'>Items (${getQtyFromCartItems()}):</div>
                <div class="payment-summary-money js-price">R${formatCurrency(
                                        price
                                    )}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money js-shipping">R${formatCurrency(
                                        Shipping
                                    )}  </div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money js-subtotal">R${formatCurrency(
                                        subtotal
                                    )}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money js-tax">R${formatCurrency(
                                        tax
                                    )}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money js-total">R${formatCurrency(
                                        total
                                    )}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
        `
	},
}

export default PaymentSummary
