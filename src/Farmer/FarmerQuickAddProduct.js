import React, {Component} from 'react';
import {Select} from 'antd';
import '../Vendor/vendorproduct.css';
import { message } from 'antd';

import axiosInstance from '../api/axiosApi';
const { Option } = Select;

class QuickAddFarmerProduct extends Component {
    constructor(props) {
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
            ComapanyName:"",
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
        const key = 'updatable';

        event.preventDefault();
        message.loading({ content: 'Your product is uploading, Please wait...', key });
		var quantity= this.state.productQuantity+" "+this.state.qtType;
        
        const uploadData = new FormData();
            uploadData.append('user',axiosInstance.getUserInfo().user.pk)
            uploadData.append('productName',this.state.productName)
            uploadData.append('category',this.state.category)
            uploadData.append('productPicture',this.state.productPicture, this.state.productPicture.name)
            uploadData.append('productQuantity', this.state.productQuantity)
            uploadData.append('productUnit', this.state.qtType)
            uploadData.append('prodyctType', this.state.productType)
            uploadData.append('productPrice', this.state.productPrice)
            uploadData.append('description', this.state.description)
 
		try {
            const response = await axiosInstance.addProduct(uploadData).then(response=>{
                if(response.status === 201){
                    message.success({ content: 'Uploaded Sucessfully!', key, duration: 2 });
                    console.log(response);
                    window.location.reload();
                }
                else{
                    message.error({ content: 'Upload Failed!', key, duration: 2 });
                }
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    render() { 
        return (  
            <div class="pg-wrapper p-t-100 p-b-100 font-robo">
                    <div class="wrap wrap--w680">
                        <div class="cad cad-1">
                            <div class="cad-heading"></div>
                            <div class="cad-body">
                                <h2 class="title">Add Product</h2>
                                <form onSubmit={this.handleSubmit}>
                                <div class="input-group">
                                        <input class="input--style-1 in" type="file" placeholder="Choose Image" name="name" onChange={this.uploadPic}/>
                                    </div>
                                    <div class="input-group">
                                        <input class="input--style-1 in" type="text" placeholder="Product Name" name="name" onChange={(e)=> this.setState({productName:e.target.value})}/>
                                    </div>
                                    <div class="row row-space">
                                        <div class="col-12">
                                            <div class="input-group">
                                                <Select size="medium" defaultValue="Select Category" style={{marginBottom:"2%",width:"100%"}} onChange={this.handleCategoryChange}>
                                                    <Option value="Vegetable">Vegetable</Option>
                                                    <Option value="Fruits">Fruits</Option>
                                                    <Option value="WholeGrains">WholeGrains</Option>                     
                                                </Select>  
                                            </div>
                                            
                                        </div>                        
                                    </div>
                                    
                                    <div class="input-group">
                                    <div class="col-6">
                                    <input class="input--style-1 in" type="text" placeholder="Product Quantity" name="name" onChange={(e)=> this.setState({productQuantity:e.target.value})}/>
                                  </div>
                                  <div class="col-6">
                                     <Select size="medium" defaultValue="Select Unit" style={{marginBottom:"2%",width:"100%"}} onChange={this.handleChangeQuantity}>
                                        <Option value="Kg">Kg</Option>
                                        <Option value="Mun">Mun</Option>
                                        <Option value="Acer">Acer</Option>
                                                            
                                    </Select>
                                    <div class="st-dropdown"></div>
                                    </div>
                                    </div>
                                    <div class="row row-space">
                                        <div class="col-12">
                                            <div class="input-group">
                                                <Select size="medium" defaultValue="Select Crop Type" style={{marginBottom:"2%",width:"100%"}} onChange={this.handleTypeChange}>
                                                    <Option value="Harvested-Crops">Harvested-Crops</Option>
                                                    <Option value="Standing-Crops">Standing-Crops</Option>                     
                                                </Select>  
                                            </div>
                                        </div>                        
                                    </div>
                                    
                                    <div class="input-group">
                                        <input class="input--style-1 in" type="text" placeholder="Product Price" name="name"onChange={(e)=> this.setState({productPrice:e.target.value})}/>
                                    </div>
                                    <div class="row row-space">
                                        <div class="col-12">
                                            <div class="input-group">
                                                <textarea class="input--style-1 in" type="text" placeholder="Product Description" name="res_code" row={4} onChange={(e)=> this.setState({description:e.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-t-20">
                                        <button class="bot butn butn--radius butn--green" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

    );
    }
}
     
    export default QuickAddFarmerProduct;