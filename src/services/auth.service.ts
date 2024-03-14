import { instance } from "../api/axios.api";
import {IEditProfile, IGetUser, IGetUserRole, IResponseUserData, IUserLoginData, IUserRegistrationData } from "../types/types";

export const AuthService = {
    async registration(userRegisterData: IUserRegistrationData): Promise<IResponseUserData | undefined>{
        const {data} = await instance.post<IUserRegistrationData, {data: IResponseUserData}>('registration', userRegisterData)
        return data
    },
    async login(userLoginData: IUserLoginData): Promise<IResponseUserData | undefined>{
        const {data} = await instance.post<IUserLoginData, {data: IResponseUserData}>('login', userLoginData)
        return data
    },
    async getProfile(): Promise<IGetUser | undefined>{
        const {data} = await instance.get('profile')
        if(data) return data
    },
    async editProfile(userEditProfileData: IEditProfile){
        await instance.put('profile',userEditProfileData)
    },
    async getUserRole():Promise<IGetUserRole | undefined>{
        const {data} = await instance.get('roles')
        if(data){
            return data
        }
    },
    async logout(){
        await instance.post('logout')
    }
}