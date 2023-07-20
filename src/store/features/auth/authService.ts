import axiosConfig from '../../../ultils/axiosConfig' 
import { IAuthLogin } from '../InterfaceReducer'


const apiLogin = (data:IAuthLogin) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/auth/login',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

const apiChangePassword= (data:any) => new Promise(async(resolve, reject)=>{
    try {
        const res = await axiosConfig({
            method:"post",
            url:'/api/v1/auth/change-password',
            data:data
        })
        resolve(res.data)
    } catch (error) {
        reject(error)
    }
})

const authService = {
   apiLogin,apiChangePassword
}

export default authService