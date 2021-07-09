import React, {FC} from 'react';
import {TextField} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core';
import css from './ContactsForm.module.scss'


type TContactsFormProps = {

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
    return (
        <ThemeProvider theme={theme}>
            <form className={css.form}>
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
                    <button className="btn">Send message</button>
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