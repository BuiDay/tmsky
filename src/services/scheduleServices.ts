import axiosConfig from '../../src/ultils/axiosConfig'


export const createScheduleService = (payload:any) => new Promise(async (resolve, reject) => {
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/schedule/create-schedule',
            data: payload
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const getScheduleListService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/schedule/get-list-schedule',
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

export const getScheduleById = (id:string) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/schedule/id=${id}`,
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})