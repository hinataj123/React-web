import React from 'react';
import { Spin, } from 'antd';
import {Col,Row} from 'antd'
// import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import axiosInstance from '../../api/axiosApi';
import {connect} from 'react-redux'; 

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            modalShow: false,
            modelUpdateShow:false,
            articles: axiosInstance.getAuthHeader(),
            isLoading:false,
            imageUrl:"",
            productName:"",
            category:"",
            productPicture:"",
            productQuantity:"",
            prodyctType:"",
            productPrice:"",
            description:"" ,
            profile:[],
            hello:{}
        }
        
    }
    // componentDidMount() {
            
    //         axiosInstance.getProfile().then(res => {
    //           this.setState({
    //             profile: res.data,
    //             isLoading:false
    //         });
    //         console.log(this.state.profile);
    //       });
    //     }    
    
    render() {
        // if(this.state.isLoading){
        //     return(  
              
        //           <Spin tip="Loading..." size="large" style={{justifyContent:"center", alignItems:"center"}}/>
              
        //           );
        //   }
          
        //   else{
            const {profile} = this.props;
        console.log(profile.photo)
        return(
            <div  style={{backgroundColor:"lightgray",paddingTop:"2%", paddingBottom:"2%"}}>
        <center>    
        {/* marginLeft:"7%",marginRight:"7%", */}
                {/* <div className="container" style={{ height:"100%",width:"80%", padding:"3%",borderRadius:0}}> */}
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
               <Col span={12} className="gutter-row">
                        <div>
                            <img src={profile.profile.photo} alt = "My Pic" 
                              width = 'auto' height = "500" />
                        </div>
                        <div className="clearfix">
        
                 </div>
                 </Col>
                 <Col span={4} className="gutter-row">
                <div style={{display:"inline", float:"right", textAlign:"left",paddingLeft:"2%", marginBottom:"2%"}}>
                            <h2 style={{marginTop:"20%"}}>{profile.first_name}&nbsp;{profile.last_name}</h2>
                            <p >{profile.email}</p>
                            <p>{profile.username}</p>
                            <br />
                            <div style={{backgroundColor:"lightgrey", height:"0.5%", width:"130%" }}>
                                </div>
                                <div>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="row">Location</th>
                                        <td style={{paddingLeft:"12%"}}>Islamabad</td>
                                        
                                    </tr>
                                   
                              
                                    <tr>
                                    <th scope="row">Farm Location</th>
                                    <td style={{paddingLeft:"12%"}}>{profile.profile.Address}</td>
                                       
                                    </tr>
                                  
                                    <tr>
                                   
                                        <th scope="row">Category</th>
                                        <td style={{paddingLeft:"12%"}}>{profile.profile.Category}</td>
                                        
                                        </tr>
                                      
                                        <tr>
                                       
                                        <th scope="row">Telephone No.</th>
                                        <td style={{paddingLeft:"12%"}}>{profile.profile.Contact}</td>
                                        </tr>
                                        
                                        <tr>
                                       <th scope="row" style={{borderRadius:10,backgroundColor:"green",color:"white",textAlign:'center'}}>Delivery</th>
                                       <td style={{paddingLeft:"12%"}}>{profile.profile.Delivery}</td>
                                       </tr>
                                       
                                </thead>
                               
                            </table>         
                        </div>
                        </div>
                        </Col>
                        </Row>
                    
                    <div>
                        
                    </div>
           
      
</center>
</div>
        )
          }   
    }

const mapStateToProps = (state) => ({
profile : state.data.profile
})

export default connect(mapStateToProps,{})(Profile)         

