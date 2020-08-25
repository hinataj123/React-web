import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';


class SpecialProductItem extends Component {

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

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
            this.props.onDecrementClicked()
        }else{
            console.log('removefromcart')
            this.setState({openQuantity:false})
            this.props.onRemoveFromCart()
        }
    }

    plusQty = () => {
        if(this.props.product.productQuantity >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
            this.props.onIncrementClicked()
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
            this.setState({ quantity: parseInt(e.target.value) })
    }
    updateQty = (e) => {
        if(this.props.product.stock >= parseInt(e.target.value)) {
            this.setState({ quantity: parseInt(e.target.value) })
            this.props.onAddToCartClicked()
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    openQuantity = () => {
        this.setState({openQuantity:true});
        this.props.onAddToCartClicked()
    }

    render() {
        const {
            product,
            symbol,
            onAddToCartClicked,
            onAddToWishlistClicked,
        } = this.props;

        let RatingStars = []
        for(var i = 0; i < product.rating; i++) {
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
                        <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`} ><img
                            src={`${
                                product.productPicture
                            }`}
                            className="img-fluid lazyload bg-img"
                            alt="" /></Link>
                    </div>
                    
                    <div className="cart-info cart-wrap">
                         {
                         localStorage.getItem('userInfo') !==null && localStorage.getItem('category') === 'Customer'
                         ?   
                            <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked}>
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                        :
                        ''
                        }    
                        <a href="javascript:void(0)" data-toggle="modal"
                           data-target="#quick-view"
                           title="Quick View"
                           onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                    
                    <div className="addtocart_btn">
                        {
                         localStorage.getItem('userInfo') !==null && localStorage.getItem('category') === 'Customer'
                         ?   
                        <button className="add-button add_cart" title="Add to cart" onClick={this.openQuantity}>
                            add to cart
                        </button>
                        :
                        ''
                        }
                        <div className={`qty-box cart_qty ${this.state.openQuantity?'open':''}`}>
                            <div className="input-group">
                              <span className="input-group-prepend">
                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                 <i className="fa fa-minus"></i>
                                </button>
                              </span>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.changeQty}
                                    onBlur={this.updateQty}
                                    className="form-control input-number" />
                                <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-plus"></i>
                                </button>
                               </span>
                            </div>
                        </div>
                    </div>
                    {this.state.stock != 'InStock'?<span>Out Of Stock</span>:''}
                </div>
                <div className="product-detail text-center">
                    <div>
                        <div className="rating">
                            {RatingStars}
                        </div>
                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/product/${product.id}`}>
                            <h6>{product.productName}</h6>
                        </Link>
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
                                                    
                                                        {
                                                            localStorage.getItem('userInfo') !==null && localStorage.getItem('category') === 'Customer'
                                                            ?
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
                                                        :
                                                        <div>
                                                           <p> {product.productQuantity} {product.productUnit} </p>
                                                           
                                                        </div>
                                                        }   
                                                    
                                                </div>
                                            </div>
                                            <div className="product-buttons">
                                            {
                                                localStorage.getItem('userInfo') !==null && localStorage.getItem('category') === 'Customer'
                                                ?   
                                                <button  className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >add to cart</button>
                                                : ""
                                                }
                                                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`} className="btn btn-solid">view detail</Link>
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

export default SpecialProductItem;