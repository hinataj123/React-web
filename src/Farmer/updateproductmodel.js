import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Row, Col} from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Select } from 'antd';
import axiosInstance from '../api/axiosApi';
const { TextArea } = Input;
const { Option } = Select;

var pname;
var pcategory;
var ppicture;
var pqty;
var pprice;
var ptype;
var pdes;

export default class MyupdatedModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            articles:{},
            productName:"",
            category:"",
            productPicture: null,
            productQuantity:"",
            qtType:"",
            productType:"",
            productPrice:"",
            description:"" 
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

     handleCategoryChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            category:value
        })
    }

    handleTypeChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            productType:value
        })
    }
     handleChangeQuantity=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            qtType:value
        })
    }
     uploadPic=(event)=>{
        console.log(event.target.files[0]);
        this.setState({
            productPicture:event.target.files[0]
        })
    }

     handleSubmit(id){
        console.log("data: ",this.props.data)
        
        var quantity= this.state.productQuantity+" "+this.state.qtType;
          
        const uploadData = new FormData();
            uploadData.append('username',axiosInstance.getUserInfo().user.pk)
            if(this.state.productName!=""){
            uploadData.append('productName',this.state.productName)}
            else{
                uploadData.append('productName',this.props.data.productName)
            }
            if(this.state.category!="")
{            uploadData.append('category',this.state.category)}
else{
    uploadData.append('category',this.props.data.category) 
}if(this.state.productPicture!=""){
          uploadData.append('productPicture',this.state.productPicture, this.state.productPicture.name)
        }
            else{
                uploadData.append('productPicture',this.props.data.productPicture)
            }
           if(this.state.productQuantity!=""){
            uploadData.append('productQuantity', this.state.productQuantity)
           } 
           else{
            uploadData.append('productQuantity', this.props.data.productQuantity)
           }
           if(this.state.qtType!=""){
            uploadData.append('productUnit', this.state.qtType)
           } 
           else{
            uploadData.append('productUnit', this.props.data.productUnit)
           }
           if(this.state.productType!=""){
            uploadData.append('prodyctType', this.state.productType)
           }
           else{
            uploadData.append('prodyctType',this.props.data.prodyctType)
           }
           if(this.state.productPrice!=""){
            uploadData.append('productPrice', this.state.productPrice)
           }
           else{
            uploadData.append('productPrice', this.props.data.productPrice)
           }
            if(this.state.description!=""){
                uploadData.append('description', this.state.description)
            }
            else{
                uploadData.append('description', this.props.data.description)
            }
           
        
        axiosInstance.updateproduct(id,uploadData)
        .then(res => 
            console.log(res)
        )
        .catch(error=> console.error(error));
             
    }
    
      
    render(){
        
    return (
      <Modal

        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Input type="file" accept="image/png, image/jpeg, image/jpg" placeholder="Upload Image" size="large" onChange={this.uploadPic} />
                <Input size="large" placeholder="Product Name"   style={{marginBottom:"2%"}}  onChange={(e)=> this.setState({productName:e.target.value})} prefix={<UserOutlined />} />         
                <Row>
                <Col span={24}>
                        <Select size="large" defaultValue="Select Category"   style={{marginBottom:"2%",width:"100%"}} onChange={this.handleCategoryChange}>
                            <Option value="Vegetable">Vegetable</Option>
                            <Option value="Fruits">Fruits</Option>
                            <Option value="WholeGrains">WholeGrains</Option>                     
                        </Select>
                   </Col>     
                </Row>
                <Row >
                   <Col span={12}>
                    <Input size="large" placeholder="Product Quantity" style={{marginBottom:"2%"}}   onChange={(e)=> this.setState({productQuantity:e.target.value})} prefix={<UserOutlined />} />
                   </Col>
                   <Col span={12}>
                        <Select size="large" defaultValue="Select Unit" style={{width: 120 }}  onChange={this.handleChangeQuantity}>
                            <Option value="kg">KG</Option>
                            <Option value="mun">Mun</Option>
                            <Option value="acer">Acer</Option>
                        </Select>
                   </Col>
                </Row>
                
                <Row>
                <Col span={24}>
                        <Select size="large" defaultValue="Select Crop Type" style={{marginBottom:"2%",width:"100%"}} onChange={this.handleTypeChange}>
                            <Option value="Harvested-Crops">Harvested-Crops</Option>
                            <Option value="Standing-Crops">Standing-Crops</Option>
                                                 
                        </Select>
                   </Col>     
                </Row>
                <Input size="large" placeholder="Product Price(PKR)"  style={{marginBottom:"2%"}}  onChange={(e)=> this.setState({productPrice:e.target.value})} prefix={<UserOutlined />} />
                <TextArea size="large" placeholder="Description"  onChange={(e)=> this.setState({description:e.target.value})} rows={3} />        
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={() => this.handleSubmit(this.props.data.id)}>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
  

