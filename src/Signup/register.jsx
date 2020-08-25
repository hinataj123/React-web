import React, {Component} from 'react';
import './register.css';
import Breadcrumb from "../components/common/breadcrumb";
import {Helmet} from 'react-helmet';
import SimpleReactValidator from 'simple-react-validator';
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import axios from 'axios';
import {Radio,message,Carousel,Select } from 'antd';
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const { Option } = Select;

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
			
            value: 'yes',
			username:"",
			password: "",
			firstname:"",
			lastname:"",
			address:"",
			contact:"",
			location:"",
			email:"",
			category:"",
			photo:"",
			errors:{},
			backgroundColor:'',
			color:''
        };

        this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validator = new SimpleReactValidator();
		this.analyze = this.analyze.bind(this);
	}
	
	analyze(event) {
		if(strongRegex.test(event.target.value)) {
			this.setState({ backgroundColor: "Good Password" });
			this.setState({	[event.target.name] : event.target.value})
			 this.setState({ color: "green" });
		} else if(mediumRegex.test(event.target.value)) {
			this.setState({ backgroundColor: "Medium Password: Easy to Guess" });
			this.setState({	[event.target.name] :event.target.value})
			this.setState({ color: "blue" });
		} else {
			this.setState({ backgroundColor: "Week Password" });
			this.setState({	[event.target.name] :event.target.value})
			this.setState({ color: "red" });
		}
	
	}
    handleChange(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

	  
	  
    }

    async handleSubmit(event) {
		event.preventDefault()
		if (this.validator.allValid()) {
           

		const key = 'updatable';
		event.preventDefault();
		message.loading({ content: 'Loading...', key, duration:10 });
		const username=this.state.username;
		const password=this.state.password;
		const firstname=this.state.firstname;
		const lastname=this.state.lastname;
		const address=this.state.address;
		const contact=this.state.contact;
		const email=this.state.email;
		const location=this.state.location;
		const delivery=this.state.value; 

		const category= this.state.category;
		try {
            const response = await axios.post('http://192.168.18.24:8000/api/users/',{
				username: username,
				first_name:firstname,
				last_name:lastname,
				email: email,
				password: password,
				profile:{
					Category:category,
					Contact:contact,
					Address:address,
					location:location,
					Delivery:delivery,
				}
			})
			.then(res=>{
				if(res.status === 201){
					message.success({ content: 'Signup Successfull!', key, duration:2 });
					this.props.history.push(`${process.env.PUBLIC_URL}/pages/login`);
				}
				else{
					message.error({ content: 'Error SigningUp, Try again!', key, duration:4 });
				}
			})
            return response;
	}
		catch (error) {
            console.log(error);
			}
		} else {
			this.validator.showMessages();
			// rerender to show messages for the first time
			this.forceUpdate();
		  }
        }
    
	handleoptChange = event => {
		var obj = {};
		obj[event.target.name] = event.target.value;
		this.setState(obj);

		if(!this.validator.fieldValid(event.target.name))
		{
			this.validator.showMessages();
		}
		// console.log('radio checked', e.target.value);
		// this.setState({
		//   value: e.target.value,
		// });
	  };
	  handleolocaChange = (loc) => {
		console.log(`selected Occupation: ${loc}`);
        this.setState({
            location:loc
        })
	  };
	  handleCategoryChange=(value)=> {
        console.log(`selected Occupation: ${value}`);
        this.setState({
            category:value
        })
    }



    render (){


        return (
            <div>
                <Helmet>
					<title>AsanKasan | Account | Signup</title>
                </Helmet>
				<Breadcrumb title={'create account'}/>
                
                
                {/*Regsiter section*/}
                <div class="wrapper">
 			<div class="inner">
 				<div class="image-holder">
					<Carousel autoplay>
						<img src="https://i.pinimg.com/originals/f4/01/5a/f4015a08c1e16b0f117c0b06300c6812.jpg" alt=""/>
					</Carousel>
 					
				</div>
 				<form onSubmit={this.handleSubmit}>
					<h3>Registration Form</h3>
 					
					 <div class="form-group">
					 <div class="form-wrapper">
 						<input type="text" placeholder="First Name" name="firstname" class="form-controlsig" value={this.state.firstname} onChange={this.handleChange}/>
						 {this.validator.message('firstname', this.state.firstname, 'required|alpha')}
						 </div>
						 <div class="form-wrapper">
						 <input type="text" placeholder="Last Name" name="lastname" class="form-controlsig" value={this.state.lastname} onChange={this.handleChange}/>
						
						
						 {this.validator.message('lastname', this.state.lastname, 'required|alpha')}
						 </div>
					 </div>

 					<div class="form-wrapper">
					 <input name="username" placeholder="Username" type="text" class="form-controlsig" value={this.state.username} onChange={this.handleChange}/>
					 {this.validator.message('username', this.state.username, 'required|alphanumeric')}
						
 					</div>
 					<div class="form-wrapper">
					 	<input name="email" type="email" placeholder="Email" class="form-controlsig" value={this.state.email} onChange={this.handleChange}/>
						 {this.validator.message('email', this.state.email, 'required|email')}
						
 					</div>
 					
					 <div class="form-wrapper">
					 	<Select size="medium" defaultValue="Select Occupation" style={{marginBottom:"2%",width:"100%",alignItems:'left'}} onChange={this.handleCategoryChange}>
                            <Option value="Farmer">Farmer</Option>
                            <Option value="Customer">Customer</Option>
                            <Option value="Vendor">Vendor</Option>                     
                        </Select>
						
 					</div>
					 
					 
					 <div class="form-wrapper" style={{ color: this.state.color }} >
					 	<input name="password" placeholder="Password" type="password" class="form-controlsig" value={this.state.password} onChange={this.analyze}/>
                         	{this.state.backgroundColor }
							 <ReactIsCapsLockActive>
								{active => <span> {active ? ' Caps lock is On' : ''}</span>}
							</ReactIsCapsLockActive>
						
 					</div>
				
 					<div class="form-wrapper">
 						<input type="text" placeholder="Contact No" name="contact" class="form-controlsig" value={this.state.contact} onChange={this.handleChange}/>
						 {this.validator.message('contact', this.state.contact, 'required|phone')}
 					</div>
 					<div class="form-wrapper">
 					<input type="text" placeholder="Address" name="address" class="form-controlsig" value={this.state.address} onChange={this.handleChange}/>
					 {this.validator.message('address', this.state.address, 'required|min:10|max:120')}
 					</div>
					 <div class="form-wrapper">
					 	<Select size="medium" defaultValue="Select Location" style={{marginBottom:"2%",width:"100%",alignItems:'left'}} onChange={this.handleolocaChange}>
                            <Option value="Islamabad">Islamabad</Option>
                            <Option value="Lahore">Lahore</Option>
                            <Option value="Karachi">Karachi</Option>     
							<Option value="Faisalabad">Faisalabad</Option>    
							<Option value="Multan">Multan</Option>       
							<Option value="Attock">Attock</Option>   
							<Option value="Chakwal">Chakwal</Option> 
							<Option value="Gujrawala">Gujrawala</Option>                
							<Option value="Gujrat">Gujrat</Option>                
                        </Select>
						
 					</div>
 					<div class="form-wrapper">
 					<label for="delivery" style={{textAlign:"left", marginRight:'3%'}}>Delivery</label>
 					<Radio.Group onChange={this.handleoptChange}>
 						<Radio value={'yes'}>Yes</Radio>
         				<Radio value={'no'}>No</Radio>
 					</Radio.Group>
 					</div>
					
 					<button type="submit" className="reg">Register
 					</button>
 				</form>
 			</div>
 		</div>
            </div>
        )
    }
}

export default Register