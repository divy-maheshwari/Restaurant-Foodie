import React, { useState, useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../../actions/userActions'

const Register = (props) => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');
  const history = useHistory();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const {loading,verifyUserInfo,error} = userRegister;

  useEffect(() => {
    if(verifyUserInfo) {
      history.push('/verify');
    }
    else {
      history.push('/register')
    }
  },[verifyUserInfo]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name,email,password,rePassword));
  }


    return (
        <div>
        {loading && <div>LOADING...</div>}
        {error && <div>{error}</div>}
        <form onSubmit={e => submitHandler(e)} style={{margin: "auto",width:"30%"}}>
             <div className="form-group ">
          <label htmlFor="exampleInputName">Name</label>
          <input type="text" name="name" className="form-control" id="exampleInputName" onChange={event => setName(event.target.value)} required/>
          </div>
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name="email" id="exampleInputEmail1" onChange={event => setEmail(event.target.value)} aria-describedby="emailHelp" placeholder="example@gmail.com" required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" name="password" onChange={event => setPassword(event.target.value)} id="exampleInputPassword1" required/>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input type="password" className="form-control" name="rePassword" onChange={event => setRePassword(event.target.value)} id="exampleInputPassword2" required/>
        </div>
        <div className="form-group">
        <Link to={redirect === "/" ? "signIn" : "signIn?redirect=" + redirect} >Already have an Account</Link>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default Register;