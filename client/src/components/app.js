import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './navbar';
import HomeScreen from './screens/HomeScreen'
import Register from './screens/RegisterScreen'
import LogIn from './screens/LogInScreen'
import Profile from './screens/ProfileScreen'
import CheckOut from './screens/CheckOutScreen'
import ProductScreen from './screens/ProductScreen'
import Verify from './screens/Verification'
import CartScreen from './screens/CartScreen'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={HomeScreen} />
                <Route path="/register" component={Register} />
                <Route path="/signIn" component={LogIn} />
                <Route path="/profile" component={Profile} />
                <Route path="/checkOut" component={CheckOut} />
                <Route path="/products" component={ProductScreen} />
                <Route path="/verify" component={Verify} />
                <Route path="/cart" component={CartScreen} />
            </Switch>
        </Router>
    )
} 

export default App;