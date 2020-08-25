import React, {Component} from 'react';
import {Row, Col} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import StarRatings from 'react-star-ratings';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { addReview} from '../../../actions'

import { Spin, } from 'antd';
class DetailsTopTabs extends Component {
    constructor(props){
        super(props);
        this.state={
            product:[],
            isloading:true,
            rateValue: 4,
            name:'',
            text: '',
         
        }
    }
    
  
    async componentDidMount(){
        await axios.get(`http://192.168.18.24:8000/api/users/${this.props.item.user}/`).then(response  => {
            if(response.status === 200){
                this.setState({
                    product: response.data,
                    isloading:false
                    
                });
                console.log(this.state.product)
            }
            else{
                console.log("error fetching category");
            }
        });
    }
    addReview = (event) => {
        event.preventDefault();
        const reviewdata={
          rate:this.state.rateValue,
          reviewer_name:this.state.name,
          review_content:this.state.text,
          product_id: 1,
        }
        addReview(reviewdata);
        alert("review added");
    ;
      };
    render (){
        
        const {item, reviews} = this.props;
        console.log(reviews)
        return (
            <section className="sec" className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Profile</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i> Reviews</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Write Review</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        <tr>
                                            <th>Category</th>
                                            <td>{item.category}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <p className="mt-4 p-0">
                                   {item.description}
                                </p>
                            </TabPanel>
                            {this.state.isloading===false?
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                    <tr>
                                        <th>Full Name</th>
                                        <td>{this.state.product.first_name}{' '}{this.state.product.last_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Contact Number</th>
                                        <td>{this.state.product.profile.Contact}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{this.state.product.profile.location}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            :
                    ''
                             }
                            <TabPanel  >
                                {
                                reviews.map((item)=>{
                                    console.log(item)
                                    return(
                                        
                                        <table >
                                    <tbody>
                                    <tr>
                                                     <td><StarRatings
                                                        rating={item.rate}
                                                        starRatedColor="orange"
                                                        //changeRating={this.changeRating}
                                                        numberOfStars={5}
                                                        name='rating'
                                                    /></td>
                                    </tr>
                                    <tr>
                                        
                                        <td>{item.reviewer_name}</td>
                                    </tr>
                                   
                                    <tr>
                                       
                                        <td> {item.review_content}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                       
                                    )
                                })
                            }
                            </TabPanel>

                        <TabPanel>
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                            <div className="media m-0">
                                                <label>Rating</label>
                                                <div className="media-body ml-3">
                                                    <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter Your name" required 
                                            onChange={(e)=> this.setState({name:e.target.value})}/>

                                        </div>
                                       
                                        <div className="col-md-12">
                                            <label htmlFor="review"> Write Your Review </label>
                                            <textarea className="form-control" placeholder="Wrire Your Testimonial Here" 
                                          onChange={(e)=> this.setState({text:e.target.value})}
                                            id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit" onClick={this.addReview}>Submit Your Review</button>
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;
