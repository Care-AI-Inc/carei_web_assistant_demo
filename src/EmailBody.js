import React from 'react';
import { useContext } from 'react';
import EmailContext from './Context';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const EmailBody = () => {
    const emailContext = useContext(EmailContext);

    if (!emailContext || !emailContext.email || !emailContext.email.email) {
        return <p>Please select an email</p>;
    } else {
        return <div dangerouslySetInnerHTML={{__html: emailContext.email.email.email_content}} />
    }


}
export default EmailBody;

