import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {addToCart,removeFromCart} from '../../actions/cartActions'


const CartScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;


    const removeFromCartHandler = (productId) => {
            dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        history.push("/signIn?redirect=checkOut");
    }
    return (
        <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Food Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li key={item.product}>
                <div className="cart-image">
                  <img src={`./uploads/${item.image}`} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                      {item.name}
                  </div>
                  <div>
                    Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="btn btn-danger" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty * 1, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="btn btn-success" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
    );
}


export default CartScreen;