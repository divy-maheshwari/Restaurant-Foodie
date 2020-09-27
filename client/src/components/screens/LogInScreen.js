import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {signIn} from '../../actions/userActions'

const LogIn = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  const userSignIn = useSelector(state => state.userSignIn);
  const {loading,userInfo,error} = userSignIn;

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
    else {
      history.push('/signIn');
    }
  },[userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email,password));
  }


    return (
      <div>
        {loading && <div>LOADING...</div>}
        {error && <div>{error}</div>} 
        <form onSubmit={e => submitHandler(e)} style={{margin: "auto",width: "25%"}}>
         <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name="email" id="exampleInputEmail1" onChange={event => setEmail(event.target.value)} aria-describedby="emailHelp" placeholder="example@gmail.com" required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" name="password" onChange={event => setPassword(event.target.value)} id="exampleInputPassword1" required/>
        </div>
        <div className="form-group">
        <Link to={redirect === '/' ? 'register' : `register?redirect=${redirect}`}>Doesn't have an Account</Link>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    );
}

export default LogIn;