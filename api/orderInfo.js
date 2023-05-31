import request from '@/utils/request'

const api_name = "/api/order/orderInfo"

export default {
    //get order
    saveOrders(scheduleId, patientId) {
        return request({
            url: `${api_name}/auth/submitOrder/${scheduleId}/${patientId}`,
            method: `post`
        })
    },


    //order detail
    getOrders(orderId){
        return request({
            url: `${api_name}/auth/getOrders/${orderId}`,
            method: `get`
        })
    },

    //get order page list
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/auth/${page}/${limit}`,
            method: `get`,
            params: searchObj
        })
    },

    //get order status
    getStatusList() {
        return request({
            url: `${api_name}/auth/getStatusList`,
            method: 'get'
        })
    },

    cancelOrder(orderId){
        return request({
            url: `${api_name}/auth/cancelOrder/${orderId}`,
            method: 'get'
        })
    
    }

    
}