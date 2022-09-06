import './cart-dropdown.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <button>GO TO CHECKOUT</button>
        </div>
    )
}

export default CartDropDown;