import React, {FC, useEffect} from 'react';
import {TextField} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {withStyles} from '@material-ui/core';
import css from './ContactsForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {sendEmail, setFormErrorDescription, TEmailSendingStatus} from "../../../bll/reducers/contacts";
import {useFormik} from "formik";
import {TState} from "../../../bll/store";


export type TContactsFormData = {
    name: string
    email: string
    subject: string
    message: string
}
type TContactsFormError = {
    name?: string
    email?: string
    subject?: string
    message?: string
}

const theme = createTheme({
    palette: {
        text: {
            primary: '#ffffcc'
        },
        primary: {
            main: '#aa0000',
        },
        secondary: {
            main: '#ffffcc',
        },
    },
});
const ContactsForm: FC = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector<TState, TEmailSendingStatus>(state => state.contacts.emailSendingStatus)
    const contactsForm = useFormik(
        {
            initialValues: {
                name: '',
                email: '',
                subject: '',
                message: '',
            },
            validate: (formData) => {
                const errors: TContactsFormError = {};
                if (!formData.name) {
                    errors.name = 'Name is required'
                }
                if (!formData.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
                    errors.email = 'Invalid email address. Please try again';
                }
                if (!formData.subject) {
                    errors.subject = 'Subject is required'
                }
                if (!formData.message) {
                    errors.message = 'Drop me just a few lines =)'
                }
                return errors;
            },

            onSubmit: (values) => {
                dispatch(sendEmail(values))
            },
        }
    )
    useEffect(() => {
        if (status === "Succeeded!") contactsForm.resetForm()
    }, [])

    if (Object.values(contactsForm.errors).length > 0 && contactsForm.isSubmitting) {
        let errorsArr = Object.values(contactsForm.errors)
        errorsArr.length > 1
            ? dispatch(setFormErrorDescription('Fill all fields correctly'))
            : dispatch(setFormErrorDescription(errorsArr[0]))
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={contactsForm.handleSubmit}
                  className={css.form}
                  autoComplete={'off'}>
                <div className={css.row}>
                    <CTextField error={!!contactsForm.errors.name && contactsForm.touched.name}
                                label="Name"
                                name={'name'}
                                value={contactsForm.values.name}
                                onChange={contactsForm.handleChange}
                                onBlur={contactsForm.handleBlur}
                                variant="outlined"
                                InputLabelProps={{style: {color: '#ffffcc'}}}/>
                    <CTextField error={!!contactsForm.errors.email && contactsForm.touched.email}
                                label="Email"
                                name={'email'}
                                value={contactsForm.values.email}
                                onChange={contactsForm.handleChange}
                                onBlur={contactsForm.handleBlur}
                                variant="outlined"
                                InputLabelProps={{style: {color: '#ffffcc'}}}/>
                </div>
                <div className={css.row}>
                    <CTextField error={!!contactsForm.errors.subject && contactsForm.touched.subject}
                                label="Subject"
                                name={'subject'}
                                value={contactsForm.values.subject}
                                onChange={contactsForm.handleChange}
                                onBlur={contactsForm.handleBlur}
                                variant="outlined"
                                InputLabelProps={{style: {color: '#ffffcc'}}}/>
                </div>
                <div className={css.row}>
                    <CTextField error={!!contactsForm.errors.message && contactsForm.touched.message}
                                label="Message"
                                name={'message'}
                                value={contactsForm.values.message}
                                onChange={contactsForm.handleChange}
                                onBlur={contactsForm.handleBlur}
                                variant="outlined"
                                multiline rows={5}
                                InputLabelProps={{style: {color: '#ffffcc'}}}/>
                </div>
                <div className={css.row}>
                    <button type={'submit'} className="btn">Send message</button>
                </div>
            </form>
        </ThemeProvider>

    )
})

const CTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#ffffcc',

        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#aa0000',
            borderWidth: '3px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: '#ffffcc',
                borderColor: '#ffffcc',
                borderWidth: '3px',
            },
            '&:hover fieldset': {
                borderColor: '#ffffcc',
                borderWidth: '3px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#aa0000',
                borderWidth: '3px',
            },
            '&.Mui-error fieldset': {
                borderColor: '#ff0000',
                animation: 'blinking 1s infinite'
            }
        },
    },
})(TextField)

export default ContactsForm