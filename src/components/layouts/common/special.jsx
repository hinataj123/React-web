import React, { Component } from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import {getSingleItem, getSpecialCollection} from '../../../services/index'
import {
    addToCart,
    addToWishlist,
    addToCompare,
    incrementQty,
    decrementQty,
    removeFromCart
} from "../../../actions/index";
import ProductItem from './special-product-item';

class Special extends Component {

    render (){

        const {product, symbol, addToCart, addToWishlist, addToCompare, incrementQty, decrementQty, removeFromCart} = this.props;

        return (
            <div>
                {/*Paragraph*/}
                <section className="section-b-space addtocart_count">
                    <div className="full-box">
                        <div className="container">
                            <div className="title4">
                                <h2 className="title-inner4">special products</h2>
                                <div className="line"><span></span></div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 center-slider">
                                    <div>
                                        <div className="offer-slider">
                                            <div>
                                                {
                                                    product.map((product,index)=>{
                                                        return(
                                                
                                                            <ProductItem product={product} symbol={symbol}
                                                                        
                                                                        onAddToWishlistClicked={() => addToWishlist(product)}
                                                                        onAddToCartClicked={() => addToCart(product, 1)}
                                                                        onIncrementClicked={() => incrementQty(product, 1)}
                                                                        onDecrementClicked={() => decrementQty(product.id)}
                                                                        onRemoveFromCart={() => removeFromCart(product)}  
                                                                        key={index}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, Ownprops) => ({
    product: getSpecialCollection(state.data.products, Ownprops.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps,
    {
        addToCart,
        addToWishlist,
        addToCompare,
        incrementQty,
        decrementQty,
        removeFromCart
    }) (Special);