import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import { DeleteOutlined, EditOutlined ,PlusCircleOutlined  } from '@ant-design/icons'
import {Row,Col,Button,Popconfirm, message } from 'antd'
import Addproduct from './addproductvendor';
import UpdatedModal from './updatevendor';
import style from './style.module.scss'
import axiosInstance from '../api/axiosApi';

class VendorGallery extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[],
            modalShow: false,
            modelUpdateShow:false,
            articles: axiosInstance.getAuthHeader(),
         }
    }
    removeItem(itemId) {
      axiosInstance.deleteproduct(itemId)
            .then(res => {
                console.log(res);
                message.success('Click on Yes');
                window.location.reload();                  
              })
            .then(err => {
                console.log(err)
            })
      }
      async  model(itemId){
        this.setState({modelUpdateShow:true})
        // this.setState({modelShow:true})
        console.log("item:",itemId);
          await axiosInstance.getDetailofProduct(itemId)
            .then(res => {
                this.setState({
                    hello:res.data
                    });                           
                    })
                
            .catch((error) => {
                console.error(error);
                })
        }
    componentDidMount() {
        axiosInstance.getUserProducts()
        .then(res=>{
          this.setState({
            products:res.data    
          })  
          console.log("Vendorproducts:",res.data);
        })
        .then(error=>{
            console.log(error);
        })
    }

 cancel=(e)=> {
  console.log(e);
}
render(){

  return (
    <div>
        <Row>
          <Col xs={20} sm={24} md={24} lg={24} xl={24} style={{paddingTop:"1%",paddingRight:"1%"}}>
              <Button  type="primary" style={{marginRight:"2%",float:'right'}} onClick={() => this.setState({modalShow:true})}> <PlusCircleOutlined  style={{fontSize:21}} /> ADD PRODUCTS</Button>
                  <Addproduct
                      show={this.state.modalShow}
                      onHide={() => this.setState({modalShow:false})}
                  />
                    <UpdatedModal
                      data={this.state.hello}
                      show={this.state.modelUpdateShow}
                      onHide={() => this.setState({modelUpdateShow:false})}
                    />
            </Col>
          </Row>

        
      <Helmet title="Gallery" />
      
        <div>
          <div className="card-body">
            <div className={style.items}>
              {
              this.state.products.map(item => (
                <div key={item.id} className={style.item}>
                  <div className={style.itemContent}>
                    <div className={style.itemControl}>
                      <div className={style.itemControlContainer}>
                        <Button.Group size="default">
                          <Button onClick={() =>this.model(item.id)}>
                            <EditOutlined />
                          </Button>
                          <Popconfirm
                              title="Are you sure delete this product?"
                              onConfirm={()=>this.removeItem(item.id)}
                              onCancel={this.cancel}
                              okText="Yes"
                              cancelText="No"
                          >
                          <Button  >
                            <DeleteOutlined />
                          </Button>
                          </Popconfirm>
                        </Button.Group>
                      </div>
                    </div>
                    <img src={item.productPicture} alt="Gallery" />
                  </div>
                  <div className="text-gray-6">
                    <div>{item.productName}</div>
                    <div>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}
}
export default VendorGallery
