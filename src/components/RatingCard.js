import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function RatingCard(props) {

    let API = `https://codeforces.com/api/user.info?handles=${props.handle}`;
    const [rating, setRating] = useState(0);
    const [maxRating, setMaxrating] = useState(0);

    const fetchAPIData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.result[0].rating);
            setRating(data.result[0].rating);
            setMaxrating(data.result[0].maxRating);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAPIData(API);
    }, [API]);



    return (
        <React.Fragment>
            <Card style={{ backgroundColor: '#778DA9', borderRadius: 15, width: 250, height: 100 }}>
                <CardContent>
                    {props.name === 'Rating' ? (
                        <Typography variant="h5" component="div">
                            {rating}
                        </Typography>
                    ) : (
                        <Typography variant="h5" component="div">
                            {maxRating}
                        </Typography>
                    )}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        {props.name}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}