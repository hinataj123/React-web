import React, {Component} from 'react';
import { Card,Popconfirm} from 'antd';
import { Spin, } from 'antd';
import "./profilecard.scss";
import { Button} from 'react-bootstrap';
import {DeleteOutlined,RedoOutlined} from  '@ant-design/icons';
import {Helmet} from 'react-helmet';
import Breadcrumb from "../components/common/breadcrumb";
import {Row, Col} from 'antd';
import { PlusCircleOutlined  } from '@ant-design/icons'
// import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import axiosInstance from '../api/axiosApi';
import MyVerticallyCenteredModal from './addproductModal';
import MyupdatedModal from './updateproductmodel';
class FarmerMyProducts extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            products:[],
            isLoading: true,
            modelUpdateShow:false,
            modalShow:false
        }
    }

async componentDidMount() {
        await axiosInstance.getUserProducts().then(response => {
            this.setState({
                products:response.data,
                isLoading: false
            });
            console.log('userProfileProducts: ',response)                           
        })
        .catch((error) => {
          console.error(error);
        })
        console.log(this.state.products)
    }

    removeItem(itemId) {
        axiosInstance.deleteproduct(itemId)
              .then(res => {
                    console.log(res);
                    window.location.reload();                  
                })
              .then(err => {
                  console.log(err)
              })
        }

        async model(item){
                await this.setState({
                    modelUpdateShow:true,
                    hello:item
                })
                console.log("item:",item);
        }
        
    
    cancel=(e)=> {
        console.log(e);
    }

        
    render() {
        // if(this.state.isLoading){
        //     return(  
              
        //           <Spin tip="Loading..." size="large" style={{justifyContent:"center", alignItems:"center", textAlign:'center'}}/>
              
        //           );
        // }
          
        // else{
            return (
                <div >
                    <Helmet>
                        <title>AsaanKisaan | Farmer | Myproducts</title>
                    </Helmet>
                {/*SEO Support End */}

                    <Breadcrumb title={'My Products'}/>
                    <Row>
                        <Col xs={20} sm={24} md={24} lg={24} xl={24} style={{paddingTop:"1%",paddingRight:"1%"}}>
                            <Button  type="primary" style={{float:'right'}} onClick={() => this.setState({modalShow:true})}> <PlusCircleOutlined  style={{fontSize:21}} /> ADD PRODUCTS</Button>                       
                            <MyVerticallyCenteredModal
                                show={this.state.modalShow}
                                onHide={() => this.setState({modalShow:false})}
                            />
                            <MyupdatedModal 
                                data={this.state.hello}
                                show={this.state.modelUpdateShow}
                                onHide={() => this.setState({modelUpdateShow:false})}
                            />

                            </Col>
                        </Row>
                    <div class="cards" >
                    
                    {
                        this.state.products.map(item=>{    
                            return(   
                                <div key={item.id}>
                                    
                                    <article class="crd">
                                        <div class="thumb" style={{backgroundImage:`url(${item.productPicture})`,
                                            backgroundRepeat:"no-repeat", backgroundSize:"center"}}></div>
                                        <div class="infos">
                                            <h2 class="title">{item.productName}</h2>
                                            <h3 class="date">{item.category}</h3>
                                            <h3 class="seats">{item.productPrice}&nbsp;Rs.</h3>
                                        
                                            <h3 class="seats">{item.productQuantity}</h3>
                                        
                                            <h3 class="seats">{item.prodyctType}</h3>
                                            
                                           
                                        <div>
                                        <Popconfirm
                                            title="Are you sure delete this product?"
                                            onConfirm={()=>this.removeItem(item.id)}
                                            onCancel={this.cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                        <Button ><DeleteOutlined/></Button>
                                        </Popconfirm>
                                        <Button style={{marginLeft:10}}  onClick={() =>this.model(item)}><RedoOutlined/>
                                        </Button>
                                    
                                        </div>
                                        </div>
                                    </article>
                                </div>           
                            )
                        })    
                    }               
                    </div>  
                </div>
             )
        }   
    }   
// }
 
export default  FarmerMyProducts;