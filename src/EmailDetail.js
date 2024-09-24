import React from 'react';
import { useContext } from 'react';
import EmailContext from './Context';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
const EmailDetail = () => {
    const emailContext = useContext(EmailContext);

    if (!emailContext || !emailContext.email) {
        return <p>Please select an email</p>;
    }

    const handleSubjectChange = (event) => {
        // setEmailSubject(event.target.value);
    }

    const handleContentChange = (event) => {
        emailContext.setEmailState(({
            "email": {
                ...emailContext.email.email, // Copy existing state
                "email_content": event.target.value // Update specific key
            }
        }));


        axios.patch(`http://${process.env.REACT_APP_API_URL}/emails/${emailContext.email.email.email_id}`, {
            email_content: event.target.value
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Email content updated successfully');
                }
            })
            .catch(error => console.error('Error updating email content:', error));

        //setEmailContent(event.target.value);
    }

    const handleToAddressChange = (event) => {
        // setToAddress(event.target.value);
    }

    const handleApproveAndSend = () => {
        axios.post(`http://${process.env.REACT_APP_API_URL}/emails/${emailContext.email.email.email_id}/accept`, {})
            .then(response => {
                if (response.status === 200) {
                    alert('Email approved successfully');
                    emailContext.setEmailState({});

                    const myEvent = new CustomEvent('fetchEmails', {});
                    document.dispatchEvent(myEvent);
                }
            })
            .catch(error => console.error('Error approving email:', error));
     
    }

    const handleReject = () => {
        axios.post(`http://${process.env.REACT_APP_API_URL}/emails/${emailContext.email.email.email_id}/reject`, {})
            .then(response => {
                if (response.status === 200) {
                    alert('Email rejected successfully');
                    emailContext.setEmailState({});
                    const myEvent = new CustomEvent('fetchEmails', {});
                    document.dispatchEvent(myEvent);
                }
            })
            .catch(error => console.error('Error rejecting email:', error));
        
    }

    return (
        emailContext.email.email && emailContext.email.email.email_id ? (
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off">
                <TextField
                    label="Email ID"
                    value={emailContext.email.email.email_id}
                    disabled
                />
                <br />
                <TextField
                    label="Email Subject"
                    value={emailContext.email.email.email_subject}
                    onChange={handleSubjectChange}
                />
                <br />
                <TextField
                    label="Email Content (Auto summarized)"
                    value={emailContext.email.email.email_content}
                    onChange={handleContentChange}
                    multiline
                    rows={4}
                />
                <br />

                <TextField
                    label="Doctor's Email Address"
                    value={emailContext.email.email.to_address}
                    onChange={handleToAddressChange}
                />
                <br />
                <br />
                {emailContext.email.email.status === 'PENDING' && (
                    <React.Fragment>
                        {emailContext.email.email.attachments && emailContext.email.email.attachments.length > 0 && (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    const url = `http://${process.env.REACT_APP_API_URL}/emails/${emailContext.email.email.email_id}/attachment`;
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute('download', 'attachment.zip');
                                    document.body.appendChild(link);
                                    link.click();
                                }}
                            >
                                Download Attachments
                            </Button>
                        )}
                        <Button variant="contained" onClick={handleApproveAndSend}>Approve and Send</Button>
                        <Button variant="outlined" color="error" onClick={handleReject}>Reject</Button>
                    </React.Fragment>
                )}
            </Box>

        ) : (
            <p>Please select an email from the left</p>
        )

    );
}
export default EmailDetail;

