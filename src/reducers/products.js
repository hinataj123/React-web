import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_PROFILE,
    RECEIVE_PRODUCTS,
    REVIEW_PRODUCTS
  } from "../constants/ActionTypes";

    const avatar1 = require('../assets/avatar/avatar1.png');
    const avatar2 = require('../assets/avatar/avatar2.png');
    
    // const profile = {
    //   id : 1,
    //   username : 'sulesuleman',
    //   first_name : 'Muhammad',
    //   last_name : 'Suleman',
    //   email : 'zaib31200@gmail.com',
    //   profile:{
    //       category : 'Farmer',
    //       address : 'PTV Colony',
    //       delivery : 'yes',
    //       photo: ''
    //   }
    // }
    
    
    
    const reviews=[
      {
        id:1,
        image: avatar1,
        reviewer_name: 'BeoPlay Speaker',
        review_content:
          'Wonderful jean, perfect gift for my girl for our anniversary!',
        rate: 5,
        product_id: 1,
      },
      {
        id:2,
        image: avatar2,
        reviewer_name: 'BeoPlay Speaker',
        review_content:
          'I love this, paired it with a nice blouse and all eyes on me.',
        rate: 5,
        product_id: 1,
      },
      {
        id:3,
        image: avatar1,
        reviewer_name: 'BeoPlay Speaker',
        review_content:
          'Wonderful jean, perfect gift for my girl for our anniversary!',
        rate: 5,
        product_id: 1,
      },
      {
        id:4,
        image: avatar2,
        reviewer_name: 'BeoPlay Speaker',
        review_content:
          'I love this, paired it with a nice blouse and all eyes on me.',
        rate: 5,
        product_id: 1,
      },
    ];

const initialState = {
    products: [],
    profile:{},
    symbol: 'PKR',
    product_details: [],
    reviews: reviews,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state,
                products: action.products };
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state,
                    product_details: singleItem };
            }
            case REVIEW_PRODUCTS:
              const productId = action.product.id
        if (state.reviews.findIndex(review => review.id === 1) !== -1) {
            const cart = state.reviews.reduce((cartAcc, review) => {
               
                    cartAcc.push(review)
              

                return cartAcc
            }, [])

        return { ...state, reviews }
        }

        return { ...state, reviews: [...state.reviews] }
            

            case RECEIVE_PROFILE:
          return { ...state,
              profile: action.profile };
                
        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        default:
            return state;
    }
};
export default productReducer;
