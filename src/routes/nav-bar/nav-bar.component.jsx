import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import './nav-bar.styles.scss';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

// double && evaluates to t or f based on its 2 vals
// components are all truthy vals bc they're functions
// so if CartDropDown exists it's true

const Nav = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link to='/shop' className='nav-link'>SHOP</Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>SIGN IN</Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Nav;