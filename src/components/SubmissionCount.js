import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const SubmissionCount = (props) => {
    let API = `https://codeforces.com/api/user.status?handle=${props.handle}`;
    const [submissions, setSubmissions] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(API);
                const data = await response.json();
                setSubmissions(data.result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [API, navigate]);

    const count = submissions.filter(submission => submission.verdict === 'OK').length;
    return (
        <React.Fragment>
            <Card style={{ backgroundColor: '#778DA9', borderRadius: 15, width: 250, height: 100 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {count}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        {props.name}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default SubmissionCount

