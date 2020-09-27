import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {ProductList} from '../../actions/productActions'
import {addToCart} from '../../actions/cartActions'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const qty = 1;

    const productList = useSelector(state => state.productList);
    const {products,loading,error} = productList;

    useEffect(() => {
        dispatch(ProductList());
    },[dispatch]);

    return (
        <div>
          { loading ? <div>LOADING...</div> :
           error ? <div>{error}</div> : <div>
               <ul style={{display:"flex",flexWrap:"wrap"}}>
        { products.map((product) => (
            <li key={product._id} style={{margin:"3rem",listStyleType:"none"}}>
        <div className="card" style={{width:"18rem",display:"flex",flexDirection:"column"}}>
            <img src={`./uploads/${product.image}`} alt={product.name} className="card-img-top" style={{maxHeight:"10rem"}} />
            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.description}</p>
                <h5 className="card-title">Price: ${product.price}</h5>
                <button className="btn btn-primary" onClick={e => dispatch(addToCart(product._id,qty))} >Add</button>
            </div>
        </div>
        </li>
        ))
        }
        </ul>
        </div>
}
        </div>
    )
}

export default HomeScreen;