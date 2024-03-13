export interface IUserRegistrationData{
    fullName: string,
    birthDate: string,
    email: string,
    password: string,
    confirmPassword: string
}
export interface IUserLoginData{
    email: string,
    password: string
}

export interface IResponseUserData{
    token: string
}

export interface IUser{
    id: string,
    fullName: string,
    email: string,
    birthdate: string,
    token: string
}
export interface IGetUser{
    fullName: string,
    email: string,
    birthDate: string,
}

export interface IEditProfile{
    fullName: string,
    birthDate: string,
}