import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IResponseUserData} from '../../types/types'

interface UserState {
  user: IResponseUserData | null
  IsAuth: boolean
}

const initialState: UserState = {
  user: null,
  IsAuth: false
}

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    login:(state) =>{
        state.IsAuth = true
    },
    logout:(state) =>{
        state.IsAuth = false
        state.user = null
    }
  },
})

export const {login, logout} = userSlice.actions


export const selectCount = (state: RootState) => state.user

export default userSlice.reducer