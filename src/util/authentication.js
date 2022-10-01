import React from "react";

    const createToken = (token) => {
        localStorage.token = token;
    }

    const clearToken = () => {
        localStorage.clear();
    }
    
    const checkAuthentication = () => {
        if(localStorage.token){
            return true;
        } else {
            return false;
        }
    }
   
export {createToken, clearToken, checkAuthentication};