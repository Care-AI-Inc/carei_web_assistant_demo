import React, {useState} from 'react';
import EmailList from './EmailList';
// @mui material components
import {Tabs, Tab, Box, CardContent, CardActions, Card} from "@mui/material";
import Grid from '@mui/material/Grid2';
import EmailContext from './Context';
import EmailDetail from './EmailDetail';
import EmailBody from './EmailBody';
import Typography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import logo from "./careai_logo.png"
import {TabPanelProps} from "react-tabs";
import Button from "@mui/material/Button";
import StatsCard from "./StatsCard";

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [email, setEmailState] = useState({});
    const [emails, setEmailsState] = useState({});

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <EmailContext.Provider value={{email, setEmailState}}>
            <Box sx={{flexGrow: 1}}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
                >
                    <img src={logo} alt="carei_logo" style={{width: '200px', height: '100px'}}/>
                </Box>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Reports Email" {...a11yProps(0)} />
                        <Tab label="Stats" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >

                    </Box>
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <Typography variant="h5" component="h2">
                                List of pending reports email
                            </Typography><br/>
                            <EmailList status="PENDING"/>
                            <Typography variant="h5" component="h2">
                                List of processed reports email
                            </Typography><br/>
                            <EmailList status="APPROVED"/>
                        </Grid>
                        <Grid size={9}>
                            <Typography variant="h5" component="h2">
                                Email detail
                            </Typography><br/>
                            <EmailDetail/>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <StatsCard/>
                </CustomTabPanel>
            </Box>
        </EmailContext.Provider>
    );
}

export default App;
