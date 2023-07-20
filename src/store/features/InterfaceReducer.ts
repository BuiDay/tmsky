export interface IAuthLogin {
    PhoneNumber:string,
    Password:string,
}


export interface IAuthState {
    isLoggedIn?: boolean,
    token?:string,
    msg?:string,
    isError?: boolean,
    isLoading?: boolean,
    isSuccess?: boolean,
}

export interface IUserState{
    isError?:boolean,
    msg?:string, 
    data?:{
        Email?:string, 
        FullName?:string,
        Gender?:string,
        PhoneNumber?:string,
        Role?:string,
        createdAt?:Date,
        id?:string,
        updatedAt?:Date,
    }   
}


export interface IHeaderState{
    isCollapsed?:boolean
}