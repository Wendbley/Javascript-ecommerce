export const getCartItems = () => {
    // convert from string to json
    const cartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]
    return cartItems
}

// stores cart items to localStorage
export const setCartItems = (cart) => {
    // convert from json to string
  localStorage.setItem('cartItems', JSON.stringify(cart))
    
}

/**
 * 
 * @returns 
 */
export const getQtyFromCartItems = () => {

    const array = getCartItems()
   
  if(Array.isArray(array)) {
    return array.reduce((acc, item) => acc + item.qty, 0) || 0
  }
  return array.qty
}

