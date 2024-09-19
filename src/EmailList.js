import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EmailContext from './Context';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const EmailList = () => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState([]);

    const emailContext = useContext(EmailContext);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/emails')
            .then(response => setEmails(response.data))
            .catch(error => console.error('Error fetching emails:', error));

        const handleCustomEvent = (event) => {
            axios.get('http://127.0.0.1:8000/emails')
            .then(response => setEmails(response.data))
            .catch(error => console.error('Error fetching emails:', error));
        };
        
            // Add an event listener for the custom event
        document.addEventListener('fetchEmails', handleCustomEvent);
    }, []);

    const handleEmailClick = (email) => {
        //setSelectedEmail(email);
        console.log("email clicked", email)
        emailContext.setEmailState({email: email});
    };

    const handleEdit = (field, value) => {
        setSelectedEmail({ ...selectedEmail, [field]: value });
        handleUpdate()
    };

    const handleUpdate = () => {
        axios.patch(`http://127.0.0.1:8000/emails/${selectedEmail.email_id}`, selectedEmail)
            .then(response => {
                if (response.status === 200) {
                    alert('Email updated successfully');
                    refreshEmails();
                }
            })
            .catch(error => console.error('Error updating email:', error));
    };

    const handleApprove = (emailId) => {
        axios.post(`http://127.0.0.1:8000/emails/${emailId}/accept`)
            .then(response => {
                if (response.status === 200) {
                    alert('Email approved successfully');
                    refreshEmails();
                }
            })
            .catch(error => console.error('Error approving email:', error));
    };

    const refreshEmails = () => {
        axios.get('http://127.0.0.1:8000/emails')
            .then(response => setEmails(response.data))
            .catch(error => console.error('Error fetching emails:', error));
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader">
            {emails.filter(email => email.status === 'PENDING').map(email => (
                <ListItemButton onClick={() => handleEmailClick(email)} key={email.email_id}>  
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={email.email_subject} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default EmailList;
