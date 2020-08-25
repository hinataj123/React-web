import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual'
import axiosInstance from '../../../../api/axiosApi';
class TopBar extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
      try {
          const response= await axiosInstance.logOut()
            console.log(response);
            if(response.status === 200){
              window.location = `${process.env.PUBLIC_URL}/pages/login`;
            }
          }
      catch (e) {
          console.log(e);
      }
    };
    render() {
        const {translate} = this.props;
        return (
            <div className="top-header" style={{backgroundColor:"#02060e", color :'white'}}>
                <div className="container" >
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>Welcome to Our store AsanKasan</li>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{translate('call_us')}: +92 - 323 - 5333140</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            <ul className="header-dropdown">
                            {
                            localStorage.getItem('userInfo') !== null && localStorage.getItem('category') === 'Customer'
                            ?                            
                                <li className="mobile-wishlist"><Link to={`${process.env.PUBLIC_URL}/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                            :
                                ''
                            }
                                <li className="onhover-dropdown mobile-account">
                                    <i className="fa fa-user" aria-hidden="true"></i> {translate('my_account')}
                                    
                                    {
                                        localStorage.getItem("userInfo") === null 
                                        
                                        ?
                                        <ul className="onhover-show-div">
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/login`} data-lng="en">Login</Link>
                                        </li>
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/register`} data-lng="en">Register</Link>
                                        </li>
                                        </ul>  
                                        :
                                        <ul className="onhover-show-div">
                                        <li>
                                            <Link to={`${process.env.PUBLIC_URL}/pages/profile`}  data-lng="en">Profile</Link>
                                         </li> 
                                         <li>  
                                            <Link to={'#'} onClick={this.handleLogout} data-lng="en">Logout</Link>

                                        </li>
                                    </ul>
                                    }   
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTranslate(TopBar);