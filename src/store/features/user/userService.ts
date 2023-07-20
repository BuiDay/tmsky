import axios from '../../../ultils/axiosConfig'
import { logout } from '../auth/authSilce'

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response:any = await axios({
            method: 'get',
            url: '/api/v1/auth/get-current',
        })
        resolve(response.data)
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

const userService = {
    apiGetCurrent
}


export default userService