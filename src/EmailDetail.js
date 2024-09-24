import React, {useState, useEffect, useRef} from 'react';
import {useContext} from 'react';
import EmailContext from './Context';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

import {
    ClassicEditor,
    AccessibilityHelp,
    AutoLink,
    Autosave,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    HtmlComment,
    HtmlEmbed,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Typography from "@mui/material/Typography";

const EmailDetail = () => {
    const emailContext = useContext(EmailContext);
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [originalEmailModalOpen, setOriginalEmailModalOpen] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    if (!emailContext || !emailContext.email) {
        return <p>Please select an email</p>;
    }

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'sourceEditing',
                'showBlocks',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'code',
                '|',
                'link',
                'insertTable',
                'codeBlock',
                'htmlEmbed'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            AutoLink,
            Autosave,
            Bold,
            Code,
            CodeBlock,
            Essentials,
            GeneralHtmlSupport,
            Heading,
            HtmlComment,
            HtmlEmbed,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            ShowBlocks,
            SourceEditing,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            Undo
        ],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }
            ]
        },
        initialData: emailContext.email.email ? emailContext.email.email.email_content : '',
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };


    const handleSubjectChange = (event) => {
        // setEmailSubject(event.target.value);
    }

    const handleContentChange = (event, editor) => {
        emailContext.setEmailState(({
            "email": {
                ...emailContext.email.email, // Copy existing state
                "email_content": editor.getData() // Update specific key
            }
        }));


        axios.patch(`http://${process.env.REACT_APP_API_URL}/emails/${emailContext.email.email.email_id}`, {
            email_content: editor.getData()
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
                sx={{'& > :not(style)': {m: 1, width: '100%'}}}
                noValidate
                autoComplete="off">
                <TextField
                    label="Email ID"
                    value={emailContext.email.email ? emailContext.email.email.email_id : ''}
                    disabled
                />
                <br/>
                <TextField
                    label="Email Subject"
                    value={emailContext.email.email.email_subject}
                    onChange={handleSubjectChange}
                />
                <br/>
                <div>
                    <div className="main-container">
                        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                            <div className="editor-container__editor">
                                <Typography variant="body1"
                                            style={{fontSize: '16px', color: 'grey', fontFamily: 'Roboto'}}>Auto
                                    generated summary email</Typography>
                                <div ref={editorRef}>{isLayoutReady &&
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfig}
                                        onChange={handleContentChange}
                                        data={emailContext.email.email ? emailContext.email.email.email_content : ''}
                                    />}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <TextField
                    label="Doctor's Email Address"
                    value={emailContext.email.email.to_address}
                    onChange={handleToAddressChange}
                />
                <br/>
                <br/>
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
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                setOriginalEmailModalOpen(true);
                            }}
                        >
                            View Original Email
                        </Button>
                        <Dialog
                            open={originalEmailModalOpen}
                            onClose={() => {
                                setOriginalEmailModalOpen(false);
                            }}
                        >
                            <DialogTitle>Original Email</DialogTitle>
                            <DialogContent>
                                <Typography gutterBottom>
                                    From: {emailContext.email.email.original_email_from_address}
                                </Typography>
                                <Typography gutterBottom>
                                    Subject: {emailContext.email.email.original_email_subject}
                                </Typography>
                                Body:
                                <div dangerouslySetInnerHTML={{__html: emailContext.email.email.original_email_text}}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {
                                    setOriginalEmailModalOpen(false);
                                }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
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