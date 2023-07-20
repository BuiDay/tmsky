export interface IRes{
    err?: number,
    msg?: string,
    data?:[]
}

export interface IStaff{
    id?:string,
    FullName?:string,
    PhoneNumber?:string,
    Email?:string,
    Gender?:string,
    Role?:string,
    createdAt: Date,
    updatedAt: Date,
    coaches: {
        Level?:string
      }
}