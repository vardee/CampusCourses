import { useAppSelector } from "../store/hooks"

export const useAuth = (): boolean =>{
    const isAuth = useAppSelector((state) => state.user.IsAuth)
    return isAuth
} 