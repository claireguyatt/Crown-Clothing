import './cart-dropdown.styles.scss';

import Button from '../button/button.component';

const CartDropDown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <button>GO TO CHECKOUT</button>
        </div>
    )
}

export default CartDropDown;