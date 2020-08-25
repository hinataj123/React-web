import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import store from "../store";
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {USER_API_BASE_URL} from '../api/axiosApi';
import axiosInstance from '../api/axiosApi';
import {message} from  'antd';


export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});

export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    dispatch(fetchProductsBegin());
    return fetch(USER_API_BASE_URL+'farmerProducts/')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(products => {
        dispatch(receiveProducts(products))
        return products
        
    })
    .catch(error => console.log(error.message));
    
}

export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})

export const fetchProfileBegin = () => ({
    type: types.FETCH_PROFILE_BEGIN
});

export const getUserProfile = () => dispatch => {
    const key = 'updatable';

    dispatch(fetchProfileBegin());
    return axiosInstance.getProfile().then(response => {
        if (response.status === 200) {
            message.success({ content: 'Loaded!', key, duration: 2 });
            localStorage.setItem("category", response.data.profile.Category);
            localStorage.setItem("profilePicture", response.data.profile.photo);
            localStorage.setItem("firstname", response.data.first_name);
            console.log("Category Data:",response.data.profile.Category);
        return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(profile => {
        dispatch(receiveProfile(profile.data))
        return profile.data,
        window.location = `${process.env.PUBLIC_URL}/`
    })
    .catch(error => console.log(error.message));
}

export const receiveProfile = profile =>({
    type: types.RECEIVE_PROFILE,
    profile
})
//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
        dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});
export const removeFromCart = product_id => (dispatch) => {
    toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const incrementQty = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
    toast.warn("Item Decrement Qty to Cart");

    dispatch({
    type: types.DECREMENT_QTY,
    productId})
};



//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => (dispatch) => {
    toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterCategory = (category) => ({
    type: types.FILTER_BRAND,
    category
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});

export const reviewproduct = (reviews) => (dispatch) => {
    toast.success("Item Added to Cart");
        dispatch(addReview(reviews))

}
export const addReview = (reviews) => ({
    type: types.REVIEW_PRODUCTS,
    reviews,
   
});

