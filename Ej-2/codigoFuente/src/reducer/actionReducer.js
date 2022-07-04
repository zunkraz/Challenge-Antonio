import {
    USER_AUTH,
    SET_ORDER
} from './types';

import clientAxios from '../../axios';



export function user_auth_redux(token){
    return function(dispatch){
        try {
            dispatch({
                type:USER_AUTH,
                payload:token
            });
        } catch (error) {
          console.log(error)  
        };
    };
}

export function  send_order_redux(data){
    console.log(data)
    // return async function(dispatch){
    //     try {
            
        // const response = await clientAxios.post('/orders', 
        // config, 
        // {Crust:data.Crust, Flavor:data.Flavor,Size:data.Size,Table_No:data.Table_No})
        // console.log(response.data)    
        // dispatch({
        //         type:SET_ORDER,
        //         payload: response.data
        //     });
    //     } catch (error) {
    //       console.log(error.response)  
    //     };
    // };
};

export function delete_order_redux(data){
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization:`Bearer ${data.token}`
        }
    }
    console.log(data)
    // return function(dispatch){
    //     try {
    //         dispatch({
    //             type:SET_ORDER,
    //             payload:token
    //         });
    //     } catch (error) {
    //       console.log(error)  
    //     };
    // };
}