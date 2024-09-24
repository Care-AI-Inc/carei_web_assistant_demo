import Grid from "@mui/material/Grid2";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const StatsCard = () => {
    const [totalReportsProcessed, setTotalReportsProcessed] = React.useState(0);

    React.useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_API_URL}/emails`)
            .then(response => {
                setTotalReportsProcessed(response.data.filter(email => email.status === 'APPROVED').length)
            })
            .catch(error => console.error('Error fetching emails:', error));
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
                <Grid item>
                    <Button variant="contained">All Time</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Last Week</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Last month</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Pick custom duration</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                Total reports processed
                            </Typography>
                            <Typography variant="h5" component="div">
                                {totalReportsProcessed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                Total referrals processed
                            </Typography>
                            <Typography variant="h5" component="div">
                                0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                Total prescriptions processed
                            </Typography>
                            <Typography variant="h5" component="div">
                                0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                Total general enquiry processed
                            </Typography>
                            <Typography variant="h5" component="div">
                                0
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default StatsCard;