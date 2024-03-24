import { ICreateGroupData, IDeleteGroup, IGetUserRole } from "../../types/types"

export const initialRegisterScheme ={
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: ''
}
export const initialLoginValues = {
    email: '',
    password: '',
}
export const initialCreateGroupData: ICreateGroupData = {
    name: ''
}
export const initialDeleteGroupData: IDeleteGroup = {
    id: ''
}
export const initialGetRoleData: IGetUserRole = {
    isTeacher: false,
    isStudent: false,
    isAdmin: false,
};