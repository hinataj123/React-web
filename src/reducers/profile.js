import {
    RECEIVE_PROFILE,
     
} from "../constants/ActionTypes";

const profile = {
    id : 1,
    username : 'sulesuleman',
    first_name : 'Muhammad',
    last_name : 'Suleman',
    email : 'zaib31200@gmail.com',
    profile:{
        category : 'Farmer',
        address : 'PTV Colony',
        delivery : 'yes',
        photo: ''
    }
}

const initialState = {
    profiles: null
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PROFILE:
            return { ...state,
                profiles: action.profile };
                   
            }
        }
export default profileReducer