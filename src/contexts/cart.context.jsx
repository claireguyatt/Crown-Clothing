import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    clearItemFromCart: () => { },
    cartTotal: 0
});

export const addCartItem = (cartItems, productToAdd) => {

    // find if cartItems contains pta
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found increment quantity
    // otherwise just return the pta without incrememting
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } :
            cartItem
        );
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const removeCartItem = (cartItems, productToRemove) => {

    // only decrement if it's at >1 otherwise delete it
    // find the item in the cart
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    // filter removes the first one that it finds that matches the condition
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 } :
        cartItem
    );
}

export const clearCartItem = (cartItems, productToClear) => {

    // filter removes the first one that it finds that matches the condition
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);

}

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // everytime cartItems changes, useEffect will rerender cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    // each useEffect should be for it's own thing, not good to put them 
    // together even if similar functionality ^
    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };
    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartTotal 
    };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>;
};