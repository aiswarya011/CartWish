import apiClient from "./api-client";


export function checkoutApi(){
    return apiClient.post("/order/checkout");
}