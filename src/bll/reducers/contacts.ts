import { Dispatch } from 'redux'
import {sendEmailAPI} from "../../dal/api";
import {TContactsFormData} from "../../ui/features/contacts/ContactsForm";

export type TEmailSendingStatus = 'Sending...' | 'Idle' | 'Succeeded!' | 'Failed!'
const initialState = {
    emailSendingStatus: 'Idle' as TEmailSendingStatus,
    emailFormErrorDescription: ''
}
type InitialStateType = typeof initialState

export const contactsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-SENDING-STATUS':
            return {...state, ...action.payload}
        case 'SET-ERROR-DESC':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setEmailSendStatus = (status: TEmailSendingStatus) =>
    ({type: 'SET-SENDING-STATUS', payload: {emailSendingStatus: status}} as const)

export const setFormErrorDescription = (desc: string) =>
    ({type: 'SET-ERROR-DESC', payload: {emailFormErrorDescription: desc}} as const)

export const sendEmail = (formData: TContactsFormData) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setEmailSendStatus('Sending...'))
    try {
        const response = await sendEmailAPI.sendEmail(formData)
        if (response.data === 'OK') {
            dispatch(setEmailSendStatus('Succeeded!'))
        }
    }
    catch (e) {
        dispatch(setEmailSendStatus('Failed!'))
    }
}

export type TSetEmailSendStatus = ReturnType<typeof setEmailSendStatus>
export type TSetFormErrorDescription = ReturnType<typeof setFormErrorDescription>
type ActionsType = TSetEmailSendStatus | TSetFormErrorDescription

