import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";
import axiosInstance from '../../api/axiosApi';
import {message} from 'antd';
import {Helmet} from 'react-helmet';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import store from '../../store';
import {
    getUserProfile
} from "../../actions";
import {connect } from 'react-redux';
class Login extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
            username: "", 
            password: "", 
            message: '',
            isLoading:false   ,
            errors: {
                username: '',
                
                password: '',
              }     
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
       
        localStorage.clear();
    }

    login = async (e) => {
        e.preventDefault();
          const key = 'updatable';
        if (this.state.username != '') {
            //Check for the Name TextInput
            if (this.state.password != '') {
              //Check for the Email TextInput
            
        message.loading({ content: 'Loading...', key });
      
        
       
        
        const credentials = {username: this.state.username, password: this.state.password};
            await axiosInstance.login(credentials).then(res => {
                if(res.status === 200){
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                    console.log("Login Credentials :",res.data);
                    message.loading({ content: 'Wait, Almost done...', key });
                }
                else  {
                    message.error({ content: ' try again!', key,duration:2 });
                    console.log('Username or Password is incorrect, try again!');
                }
            });
                store.dispatch(getUserProfile())
                //  axiosInstance.getProfile().then(response  => {
                //     if(response.status === 200){
                //         message.success({ content: 'Loaded!', key, duration: 2 });
                //         localStorage.setItem("category", response.data.profile.Category);
                //         localStorage.setItem("profilePicture", response.data.profile.photo);
                //         localStorage.setItem("firstname", response.data.first_name);
                //         console.log("Category Data:",response.data.profile.Category);
                //         window.location = `${process.env.PUBLIC_URL}/`;
                        
                //     }
                //     else{
                //         console.log("error fetching category");
                //     }
                // });
    
            } else {
                message.warning({ content: 'Please Enter Password!', key, duration: 2 });
            }
          } else {
            message.warning({ content: 'Please Enter User Name!', key, duration: 2 });
          }
        };
       
    

    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;

    switch (name) {
      case 'username': 
        errors.username = 
          value.length < 5
            ? 'Username Name must be 5 characters long!'
            : '';
        break;
   
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
    
  }
        
    

    render (){

        const {errors} = this.state;
        return (
            <div>
                <Helmet>
                    <title>AsanKasan | Account | Login</title>
                </Helmet>
                <Breadcrumb title={'Login'}/>
                
                
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
					
                                        <div className="form-group"  >
                                            <label htmlFor="email">Username</label>
                                            <input type="text" className="form-control" id="username" placeholder="Username"
                                                   required={true}  name="username" value={this.state.username} onChange={this.handleChange} noValidate/>
                                     <br/> {errors.username.length > 0 && 
                <span className='error' style={{ color: 'red' }}>{errors.username}</span>}
          
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" id="review"
                                                   placeholder="Enter your password" required={true}  name="password" value={this.state.password} onChange={this.handleChange} noValidate/>
                                       <br/> {errors.password.length > 0 && 
                <span className='error' style={{ color: 'red' }}>{errors.password}</span>}<br/>
           <ReactIsCapsLockActive>
								{active => <span> {active ? ' Caps lock is On' : ''}</span>}
							</ReactIsCapsLockActive>
                                        </div>
                                        
                                        <a href ={'#'} onClick={this.login} className="btn btn-solid">Login</a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New User</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href={`${process.env.PUBLIC_URL}/pages/register`} className="btn btn-solid">Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
const mapStateToProps = () => ({

})

export default connect(mapStateToProps,
    {
        getUserProfile
    })(Login);