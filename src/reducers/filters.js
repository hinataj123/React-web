import * as types from '../constants/ActionTypes'

const category = ['Vegetable', 'Fruits', 'Fertilizer', 'WholeGrains'];

const filtersReducerDefaultState = {
    category: category,
    value: { min: 250, max: 100000 },
    sortBy: ""
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    // console.log('Action Result');
    // console.log(action);
    switch (action.type) {
        case types.FILTER_BRAND:
            return {
                ...state,
                category: action.category
            };
        case types.FILTER_PRICE:
            return {
                ...state,
                value: {min: action.value.value.min, max: action.value.value.max }
            };
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        default:
            return state;
    }
}

export default filtersReducer;