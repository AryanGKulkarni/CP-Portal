import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../context/Context';

const SubmissionCount = (props) => {
    const { globalVariable } = useGlobalContext();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        setSubmissions(globalVariable? globalVariable.result:globalVariable);
    }, [globalVariable]);
    let count=0;
    if(submissions){
        count = submissions.filter(submission => submission.verdict === 'OK').length;
        console.log(count)
    }
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

