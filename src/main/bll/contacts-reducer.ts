import { Dispatch } from 'redux'
import {sendEmailAPI} from "../dal/api";

export type TEmailSendingStatus = 'sending' | 'idle' | 'succeeded' | 'failed'
const initialState = {
    emailSendingStatus: 'idle' as TEmailSendingStatus
}
type InitialStateType = typeof initialState

export const contactsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'EMAILSENDING':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setEmailSendStatus = (status: TEmailSendingStatus) =>
    ({type: 'EMAILSENDING', payload: {emailSendingStatus: status}} as const)

export const sendEmail = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setEmailSendStatus('sending'))
    const response = await sendEmailAPI.sendEmail()
    if (response) console.log(response.data)
}

export type TSetEmailSendStatus = ReturnType<typeof setEmailSendStatus>
type ActionsType = TSetEmailSendStatus

