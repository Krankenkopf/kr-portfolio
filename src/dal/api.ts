import axios from 'axios';
import {TContactsFormData} from "../ui/features/contacts/ContactsForm";

export const instance = axios.create(
    {
        baseURL: 'https://api.emailjs.com/api/v1.0/',
    }
)

export const sendEmailAPI = {
    sendEmail(formData: TContactsFormData) {
        return instance.post('email/send', {
            service_id: 'default_service',
            template_id: 'template_it8qs9o',
            user_id: 'user_47zXvv30deMUeZQJsqo9o',
            template_params: {
                'name': formData.name,
                'email': formData.email,
                'subject': formData.subject,
                'message': formData.message,
            },
            accessToken: '13a93efe63589eb6be5aec66f15aca04'
        })
    }
}




export enum ResultCodes {
    SUCCESS = 0,
    ERROR = 1
}