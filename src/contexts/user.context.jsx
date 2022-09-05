import { createContext, useEffect, useState } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({ 
    currentUser: null,
    setCurreUser: () => null
});

// actual functional component
// every context that gets built will have a user provider
// wraps around any other components that need access to the value(s)
    // any components wrapped in it will have access to the nested states
// const value holds actual values
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        // returns a function that unsubscribes (stops listening)
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        // so will unsubscribe every time it unmounts
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

