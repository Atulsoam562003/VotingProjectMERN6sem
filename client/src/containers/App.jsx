import React , {Component} from 'react';
import {Provider} from 'react-redux';
import {jwtDecode} from 'jwt-decode';

import {store} from '../store';
import { addError, setCurrentUser ,setToken} from '../store/actions';

if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    }catch (err) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
    }
}
const App = () => (
    <Provider store={store}>
        <div>App Works</div>
    </Provider>
);
export default App;