import { ICreateGroupData, IDeleteGroup } from "../../types/types"

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