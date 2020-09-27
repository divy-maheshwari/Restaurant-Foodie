const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');
const getToken = require('../config/jwt').getToken;
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const apiKey = require('../config/keys').SEND_GRID_KEY;


router.post('/register',(req,res) => {
    const {name,email,password,rePassword} = req.body;
    if(password !== rePassword) {
        res.json({msg:'Passwords do not match'});
    }
    else {
        User.findOne({email},(registeredUser) => {
            if(registeredUser) {
                res.json({msg:'user already registered'});
            }
            else {
                res.json({name,email,password,msg: "verifyNow"});
            }
        })
    }
});


router.post('/signIn',passport.authenticate('jwt',{session: false}),(req,res) => {    
    User.findOne({email:req.body.email},(err,user) => {
        if(user) {
            res.json({name:user.name,
                email:user.email,
                _id:user._id,
                isAdmin:user.isAdmin,
                token:getToken(user),
                msg: " "  
            })
        }
    }); 
});


router.post('/resend',(req,res) => {
    const transporter = nodemailer.createTransport(
        sendGridTransport({
            auth: {
              api_key: apiKey,
            },
          })
    );
      let uid = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < 6; i++ ) {
         uid += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      let mailOptions = {
        from: "divym07@gmail.com",
        to: `${req.body.email}`,
        subject: "Email Verification",
        text: "That was easy!",
        html: "<div style =" +
          "width:100%; height:100%;  " +
          "><h1 style=" +
          "font-weight:500>Hey, " +
          req.body.name +
          "<br>Welcome to Foodie</h1><h1>Thanks for Signing up on our app</h1><h3>Your Code for verification is : " + uid + " </h3></div><p>If this request is not made by you kindly ignore this mail.</p><p>Regards, <strong>Foodie</strong></p>",

      };
      transporter.sendMail(mailOptions,(err,info) => {
          if(err) {
              console.log(err);
          }
          else {
              res.json(uid);
          }
      });
});


router.post('/verify',(req,res) => {
    const {name,email,password,code,verifyCode} = req.body;
    if(code === verifyCode) {
        const user = new User({name,email,password});
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(user.password,salt,(err,hash) => {
                        if(err) {throw err;}
                        else{
                        user.password = hash;
                        user.save()
                          .then(userData => {
                              userData.token = getToken(userData);
                              User.findByIdAndUpdate(userData._id,userData,(err,updatedUserData) => {
                                  if(updatedUserData){
                                      updatedUserData.save()
                                      .then(information => {
                                        res.json({
                                            name:information.name,
                                            email:information.email,
                                            _id:information._id,
                                            token:getToken(information),
                                            isAdmin:userData.isAdmin,
                                            msg:"right"
                                        });
                                      });
                            }
                              })
                          });
                        }
                    })
                });
    }
    else {
        res.json({msg: "wrong"});
    }
});

router.post('/getToken',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) {
           res.json("noToken");
        }
        else {
            res.json(user.token);
        }
    })
});




router.get('/createAdmin',(req,res) =>{
    const userData = new User({
        name: 'shanky',
        email: 'shanky@email.com',
        password: '12345',
        isAdmin: true,
    })
    userData.save()
              .then(user => {
                  res.json(user)
              })
              .catch(err => {
                  res.json({msg: err.message})
              });
});



module.exports = router;