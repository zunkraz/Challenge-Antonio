import axios from 'axios';

const clientAxios = axios.create({
    baseURL:"https://order-pizza-api.herokuapp.com/api"
    //This routes must be protected
});

export default clientAxios;