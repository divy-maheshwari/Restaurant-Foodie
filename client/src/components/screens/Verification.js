import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {generateCode} from '../../actions/userActions'
import Cookie from 'js-cookie'

const Verify = () => {
    const [code,setCode] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const userRegister = useSelector(state => state.userRegister);
    const {verifyUserInfo,verifyCode} = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if(code === ""){
            alert('please enter valid code');
        }
        else {
            axios.post('http://localhost:5000/api/user/verify',{code,verifyCode,name:verifyUserInfo.name,email:verifyUserInfo.email,password:verifyUserInfo.password},
            {
                headers: {
                  "Content-Type": "application/json",
                }
            })
            .then(data => {
                if(data.data.msg === "right"){
                Cookie.remove('verifyUserInfo');
                document.write("<h1>Verified Successfully.You Are getting redirected to homepage page</h1>");
                setTimeout(()=>{
                history.push('/');
                },3000);
            }
            else {
                document.write("<h1>Verified Failed.Resend the code</h1>");
                history.push('/verify');
            }
            });
        }
    }

    const resend = () => {
        if(verifyUserInfo) {
        dispatch(generateCode())
        }
        else {
            history.push('/register');
        }
    }
    

      return (
        <div class="card" style={{width: '70%',margin: 'auto'}}>
        <h1 class="card-img-top">Enter the 6-digit code we sent to your email address to verify your account</h1>
          <form class="card-body" onSubmit={e  => submitHandler(e)}>
          <input type="text" class="card-text" maxLength="6" onChange={e => setCode(e.target.value)}/>
          <button type="submit" class="btn btn-success">Submit</button>
          <button type="button" class="btn btn-primary" onClick={resend}>Resend Code</button>
          </form>
      </div>
      )
}


export default Verify;