import axiosConfig from '../../src/ultils/axiosConfig'


export const apiGetCustomerList = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/customer/get-customer-list',
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

