import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../context/Context';

const Streak = (props) => {
    const { globalVariable } = useGlobalContext();
    let currentStreak = 0;
    let longestStreak = 0;
    const [cS, setcS] = useState(0);
    const [lS, setlS] = useState(0);
    let currentDate = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = globalVariable;

                if (apiResponse.status === "OK" && apiResponse.result) {
                    // Sort the result array based on creationTimeSeconds in ascending order

                    const uniqueDates = new Set();

                    // Filter the result array to include only one element for each unique date
                    const uniqueResults = apiResponse.result.filter((submission) => {
                        const submissionDate = new Date(submission.creationTimeSeconds * 1000).toDateString();

                        // Check if the date is already in the Set
                        if (uniqueDates.has(submissionDate)) {
                            return false; // Skip this element, as we already have one for this date
                        }

                        // Add the date to the Set and include this element in the result
                        uniqueDates.add(submissionDate);
                        return true;
                    });

                    const sortedResults = uniqueResults.sort((a, b) => {
                        return b.creationTimeSeconds - a.creationTimeSeconds;
                    });

                    sortedResults.forEach((submission) => {
                        const submissionDate = new Date(submission.creationTimeSeconds * 1000);
                        if (currentDate.toDateString() === submissionDate.toDateString()) {
                            currentStreak++;
                            currentDate = new Date(submissionDate.getTime() - 24 * 60 * 60 * 1000);
                            return;
                        } else {
                            longestStreak = Math.max(longestStreak, currentStreak);
                            currentStreak = 1;
                        }
                        currentDate = new Date(submissionDate.getTime() - 24 * 60 * 60 * 1000)                   
                    });
                    longestStreak = Math.max(longestStreak, currentStreak);

                    console.log("Current Streak:", currentStreak);
                    console.log("Longest Streak:", longestStreak);
                    setcS(currentStreak-1);
                    setlS(longestStreak-1);
                } else {
                    console.error("Error in API response");
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [globalVariable, currentStreak, longestStreak, currentDate]);


    return (
        <React.Fragment>
            <Card style={{ backgroundColor: '#778DA9', borderRadius: 15, width: 250, height: 100 }}>
                <CardContent>
                    {props.name === "Current Streak" ? (
                        <Typography variant="h5" component="div">
                            {cS}
                        </Typography>
                    ) : (
                        <Typography variant="h5" component="div">
                            {lS}
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

export default Streak
