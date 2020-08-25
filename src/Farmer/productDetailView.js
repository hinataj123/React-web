import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';


class MyProduct extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            openQuantity: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    

    render() {
        const {
            product,
            symbol,
        } = this.props;

        let RatingStars = []
        for(var i = 0; i < 5; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }
        return (
            <div className="product-box">
                <div className="img-wrapper">
                    <div className="lable-block">
                        {(product.new == true)? <span className="lable3">new</span> : ''}
                        {(product.sale == true)? <span className="lable4">on sale</span> : ''}

                    </div>
                    <div className="front">
                        <img
                            src={`${
                                product.productPicture
                            }`}
                            className="img-fluid lazyload bg-img"
                            alt="" />
                    </div>
                    <div className="cart-info cart-wrap">
                        <a href="javascript:void(0)" title="Add to Wishlist" >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a>
                        <a href="javascript:void(0)" data-toggle="modal"
                           data-target="#quick-view"
                           title="Quick View"
                           onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                    <div className="addtocart_btn">
                        <button className="add-button add_cart" title="Add to cart" >
                            add to cart
                        </button>
                    </div>
                    {this.state.stock != 'InStock'?<span>Out Of Stock</span>:''}
                </div>
                <div className="product-detail text-center">
                    <div>
                        <div className="rating">
                            {RatingStars}
                        </div>
                        
                            <h6>{product.productName}</h6>
                        
                        <h4>{symbol}{product.productPrice}
                            <del><span className="money">{symbol}{product.productPrice}</span></del>
                        </h4>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content quick-view-modal">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6  col-xs-12">
                                        <div className="quick-view-img">
                                            <img src={`${
                                                product.productPicture
                                            }`} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 rtl-text">
                                        <div className="product-right">
                                            <h2> {product.productName} </h2>
                                            <h3>{symbol}{product.productPrice}</h3>                                
                                            <div className="border-product">
                                                <h6 className="product-title">product details</h6>
                                                <p>{product.description}</p>
                                            </div>
                                            <div className="product-description border-product">
                                                <h6 className="product-title">quantity</h6>
                                                <div className="qty-box">
                                                    <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                        <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                        <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                    </div>
                                                </div>
                                            </div>            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
// const mapStateToProps = (state) => ({
//     items: state.data.products,
//     symbol: state.data.symbol
// })

export default 
// connect(mapStateToProps)
(MyProduct);