import React, {FC} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch} from "react-redux";
import {setEmailSendStatus, setFormErrorDescription, TEmailSendingStatus} from "../../../bll/reducers/contacts";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}


type TInfoSnackbarProps = {
    info: TEmailSendingStatus
};
const InfoSnackbar: FC<TInfoSnackbarProps> = React.memo(({info}: TInfoSnackbarProps) => {
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setEmailSendStatus('Idle'))
    }
    const alertSeverity = () => {
        switch (info) {
            case "Succeeded!": return 'success'
            case "Sending...": return 'info'
            case "Failed!": return 'warning'
            default: return 'info'
        }
    }
    const alertVisibility = info !== 'Idle'

    return (
        <Snackbar open={alertVisibility} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertSeverity()}>
                {info}
            </Alert>
        </Snackbar>
    )
})

export default InfoSnackbar