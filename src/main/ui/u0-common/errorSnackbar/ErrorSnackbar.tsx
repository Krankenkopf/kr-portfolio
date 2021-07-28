import React, {FC} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch} from "react-redux";
import {setFormErrorDescription} from "../../../bll/contacts-reducer";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}


type TErrorSnackbarProps = {
    error: string
};
const ErrorSnackbar: FC<TErrorSnackbarProps> = React.memo(({error}: TErrorSnackbarProps) => {
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        error && dispatch(setFormErrorDescription(''))
    }
    const alertVisibility = error !== ''
    return (
        <Snackbar open={alertVisibility} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={'error'}>
                {error}
            </Alert>
        </Snackbar>
    )
})


export default ErrorSnackbar