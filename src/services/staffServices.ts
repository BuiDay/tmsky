import axiosConfig from '../../src/ultils/axiosConfig'

export const apiGetStaffList = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/staff/get-staff-list',
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCoachList = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/staff/get-coach-list',
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})