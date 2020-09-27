import axios from 'axios';
import React, { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Cookie from 'js-cookie'
import {shippingSave} from '../../actions/cartActions'

const CheckOut = () => {
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [postal,setPostal] = useState('');
    const [country,setCountry] = useState('');
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const history = useHistory();

    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 10 : 0;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    useEffect(() => {
      if(!userInfo){
        history.push('/signIn');
        Cookie.remove('cartItems');
      }
    });
    
    const placeOrderHandler = () => {
        dispatch(shippingSave(address,city,postal,country));
        axios.post('http://localhost:5000/api/paytm',{user:userInfo,txn_amount:totalPrice},
        {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          })
          .then(data => {
              document.write(data.data);
              Cookie.remove('cartItems');
          })
    }


    return (
        <div className="placeorder">
      <div className="placeorder-info">
          <h1>Payment Address</h1>
          <form onSubmit={placeOrderHandler} style={{width:"40%"}}>
          <div className="form-group" >
          <label htmlFor="exampleInputAddress">Address</label>
          <input type="text" className="form-control" name="address" onChange={event => setAddress(event.target.value)} id="exampleInputAddress" required/>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputCity">City</label>
          <input type="text" className="form-control" name="city" onChange={event => setCity(event.target.value)} id="exampleInputCity" required/>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputPostal">Postal Code</label>
          <input type="number" className="form-control" name="postal" onChange={event => setPostal(event.target.value)} id="exampleInputPostal" required/>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputCountry">Country</label>
          <input type="text" className="form-control" name="country" onChange={event => setCountry(event.target.value)} id="exampleInputCountry" required/>
          </div>
          <div className="form-group ">
          <button type="submit" className="btn btn-success" >Place Order</button>
          </div>
          </form>
      </div>
            <div className="placeorder-action">
                <ul>
                <li>
                    
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
                </ul>
            </div>
      </div>
    )
}

export default CheckOut;