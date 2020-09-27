import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {ProductSearch} from '../actions/productActions'


const Navbar = () => {

  const userSignIn = useSelector(state => state.userSignIn);
  const {userInfo} = userSignIn;
  const [text,setText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
      e.preventDefault();
      const regex = new RegExp(`${userInfo.name}`,"gi");
      console.log(regex);
      dispatch(ProductSearch(text));
  }
        
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">Foodie</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
        <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
        {userInfo ?  <Link className="nav-link" to="/profile">{userInfo.name}</Link> :
        <Link className="nav-link" to="/profile">profile</Link>}
        </li>
      </ul>
      <form onSubmit={e => handleSearch(e)} className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" onChange={e => setText(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
  </nav>
  );
}


export default Navbar;