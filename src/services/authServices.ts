import axiosConfig from '../../src/ultils/axiosConfig'

export const apiRegister = (payload:any) => new Promise(async (resolve, reject) => {
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/register',
            data: payload
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})