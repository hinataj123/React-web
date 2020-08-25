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

export default class Addproduct extends React.Component {
    constructor(props){
        super(props);
            this.state={
            productName:"",
            category:"",
            productPicture: null,
            productQuantity:"",
            qtType:"",
            productType:"",
            productPrice:"",
            description:"" ,
            ComapanName:"",
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
    
    async handleSubmit(event) {
        event.preventDefault();
		var quantity= this.state.productQuantity+" "+this.state.qtType;
        console.log(axiosInstance.getUserInfo().user.pk)
        const uploadData = new FormData();
            uploadData.append('user',axiosInstance.getUserInfo().user.pk)
            uploadData.append('productName',this.state.productName)
            uploadData.append('category',this.state.category)
            uploadData.append('productPicture',this.state.productPicture, this.state.productPicture.name)
            uploadData.append('productQuantity', this.state.productQuantity )
            uploadData.append('productUnit', this.state.qtType)
            uploadData.append('prodyctType', "")
            uploadData.append('productPrice', this.state.productPrice)
            uploadData.append('description', this.state.description)
            uploadData.append('CompanyName', this.state.ComapanName)
 
		try {
            const response = await axiosInstance.addProduct(uploadData).then(response=>{
                console.log(response);
                window.location.reload();
            })
            return response;
        } catch (error) {
            console.log(error);
        }
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
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Input type="file" accept="image/png, image/jpeg, image/jpg"  placeholder="Upload Image" size="large" onChange={this.uploadPic} />
                <Input size="large" placeholder="Product Name" style={{marginBottom:"2%"}}  onChange={(e)=> this.setState({productName:e.target.value})} prefix={<UserOutlined />} />         
                <Row>
                <Col span={24}>
                        <Select size="large" defaultValue="Select Category" style={{marginBottom:"2%",width:"100%"}} onChange={this.handleCategoryChange}>
                            <Option value="Vegetable">Fertilizer</Option>
                            <Option value="Fruits">Grains</Option>
                            <Option value="WholeGrains">Pesticides</Option>                     
                        </Select>
                   </Col>     
                </Row>
                <Row >
                   <Col span={12}>
                    <Input size="large" placeholder="Product Quantity" style={{marginBottom:"2%"}} onChange={(e)=> this.setState({productQuantity:e.target.value})} prefix={<UserOutlined />} />
                   </Col>
                   <Col span={12}>
                        <Select size="large" defaultValue="Select Unit" style={{width: 120 }} onChange={this.handleChangeQuantity}>
                            <Option value="kg">KG</Option>
                            <Option value="mun">Liter</Option>
                            {/* <Option value="acer">Acer</Option> */}
                        </Select>
                   </Col>
                </Row>
                
                <Row>
                <Col span={24}>
                <Input size="large" placeholder="Company Name" style={{marginBottom:"2%"}} onChange={(e)=> this.setState({ComapanName:e.target.value})} prefix={<UserOutlined />} />
                 
                   </Col>     
                </Row>
                <Input size="large" placeholder="Product Price(PKR)"   style={{marginBottom:"2%"}}  onChange={(e)=> this.setState({productPrice:e.target.value})} prefix={<UserOutlined />} />
                <TextArea size="large" placeholder="Description" onChange={(e)=> this.setState({description:e.target.value})} rows={3} />        
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button type="success" onClick={this.handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
  

