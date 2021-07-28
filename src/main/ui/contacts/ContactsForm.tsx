import React, {FC} from 'react';
import {TextField} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core';
import css from './ContactsForm.module.scss'
import {useDispatch} from "react-redux";
import {sendEmail} from "../../bll/contacts-reducer";
import {useFormik} from "formik";


type TContactsFormProps = {

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
const ContactsForm: FC<TContactsFormProps> = ({}) => {
    const dispatch = useDispatch()
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

            onSubmit: () => {
                dispatch(sendEmail())
                //  signupForm.resetForm()
            },
        }
    )

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={contactsForm.handleSubmit} className={css.form}>
                <div className={css.row}>
                    <CTextField label="Name" variant="outlined" InputLabelProps={{style: {color: '#ffffcc'}}} />
                    <CTextField label="Email" variant="outlined" InputLabelProps={{style: {color: '#ffffcc'}}} />
                </div>
                <div className={css.row}>
                    <CTextField label="Subject" variant="outlined" InputLabelProps={{style: {color: '#ffffcc'}}} />
                </div>
                <div className={css.row}>
                    <CTextField label="Message" variant="outlined" multiline rows={5} InputLabelProps={{style: {color: '#ffffcc'}}} />
                </div>
                <div className={css.row}>
                    <button type={'submit'} className="btn">Send message</button>
                </div>
            </form>
        </ThemeProvider>

    )
}

const CTextField = withStyles({root: {
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
        },
    },
})(TextField)

export default ContactsForm