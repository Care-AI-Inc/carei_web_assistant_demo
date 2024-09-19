import React, { useState } from 'react';
import EmailList from './EmailList';
// @mui material components
import { Tabs, Tab, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EmailContext from './Context';
import EmailDetail from './EmailDetail';
import EmailBody from './EmailBody';
import Typography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [email, setEmailState] = useState({});
  const [emails, setEmailsState] = useState({});


  return (
    <EmailContext.Provider value={{ email, setEmailState }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <Typography variant="h5" component="h2">
              List of pending emails
            </Typography><br/>
            <EmailList />
          </Grid>
          <Grid size={6}>
          <Typography variant="h5" component="h2">
              Email detail
            </Typography><br/>
            <EmailDetail />
          </Grid>
          <Grid size={3}>
          <Typography variant="h5" component="h2">
              Email Preview
            </Typography> <br/>
            <EmailBody />
          </Grid>
        </Grid>
      </Box>
    </EmailContext.Provider>
  );
}

export default App;
