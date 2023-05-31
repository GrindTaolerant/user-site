import request from '@/utils/request'

const api_name = `/api/user`

export default {
    //email login
    login(userInfo) {
        return request({
            url: `${api_name}/login`,
            method: `post`,
            data: userInfo
        })
    },

    //user auth
    saveUserAuth(userAuth) {
        return request({
          url: `${api_name}/auth/userAuth`,
          method: 'post',
          data: userAuth
        })
    },

    getUserInfo() {
        return request({
          url: `${api_name}/auth/getUserInfo`,
          method: `get`
        })
    }
        
      

}
