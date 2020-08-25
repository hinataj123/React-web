import axios from 'axios';

export const USER_API_BASE_URL = 'http://192.168.18.24:8000/api/';

class axiosInstance {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "auth/login/", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        
       return {headers: {Authorization: 'JWT ' + this.getUserInfo().token }};

    }
    logOut() {
        
        localStorage.removeItem("userInfo");
        localStorage.removeItem("category");
        localStorage.removeItem("profilePicture");
        localStorage.removeItem("firstname");
        console.log("Category: ",localStorage.getItem("category"));
        console.log("UserInfo: ",localStorage.getItem("userInfo"));
        
        return axios.post(USER_API_BASE_URL + 'auth/logout/');
    }

    getProducts() {
        return axios.get(USER_API_BASE_URL + 'farmerProducts/')
    }

    getProductsdetail() {
        return axios.get(USER_API_BASE_URL + 'farmerProducts/')
    }
    getUserProducts(){
        return axios.get(USER_API_BASE_URL + `farmerProducts/?user=${this.getUserInfo().user.pk}`,this.getAuthHeader());
    } 
    getUserprofile(){
        return axios.get(USER_API_BASE_URL + `farmerProducts/?user=${this.getUserInfo().user.pk}`,this.getAuthHeader());
    }

    getProfile(){
        return axios.get(USER_API_BASE_URL + 'users/'+this.getUserInfo().user.pk+'/',this.getAuthHeader());
    }

    getDetailofProduct(productID){
        console.log("detailofproduct: ",productID);
        return axios.get(USER_API_BASE_URL + 'farmerProducts/'+productID+'/',this.getAuthHeader())
    }

    addProduct(credentials){
        return  axios.post(USER_API_BASE_URL + "farmerProducts/", credentials, this.getAuthHeader())
    }
    deleteproduct(itemid){
        console.log("detailofproduct: ",itemid);
        return axios.delete(USER_API_BASE_URL + 'farmerProducts/'+itemid+'/',this.getAuthHeader())
    }
    updateproduct(itemid,data){
        console.log("detailofproduct: ",itemid);
        return axios.put(USER_API_BASE_URL + 'farmerProducts/'+itemid+'/', data, this.getAuthHeader())
    }

    getVendorProducts(){
        return axios.get(USER_API_BASE_URL + `vendorProducts/?username=${this.getUserInfo().user.username}`,this.getAuthHeader()); 
   } 
}

export default new axiosInstance();
