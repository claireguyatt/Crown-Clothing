import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
});

export const addCartItem = (cartItems, productToAdd, numItemsInCart) => {

    // find if cartItems contains pta
    const x = ['a', 'b'];
    console.log((Array.isArray(cartItems)));
    console.log(Array.isArray(x));

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

    // increase the number of items in the cart
    numItemsInCart = numItemsInCart+1;
}

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // everytime cartItems changes, useEffect will rerender cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem({ cartItems, productToAdd }));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>;
};