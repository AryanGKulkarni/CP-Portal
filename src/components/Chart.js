import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Chart = (props) => {
    let API = `https://codeforces.com/api/user.status?handle=${props.handle}`;
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(API);
                const data = await response.json();
                console.log(data);

                if (data.status === 'OK' && data.result) {
                    const ratingCounts = {};

                    data.result.forEach((submission) => {
                        if(submission.verdict==="OK"){
                            const rating = submission.problem.rating;
                            ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
                        }
                    });


                    const chartdata = Object.entries(ratingCounts).map(([rating, count]) => ({
                        id: rating,
                        value: count,
                        label: rating,
                    }));

                    setChartData(chartdata);
                } else {
                    console.error('Error in API response');
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [API]);
    return (
        <Card style={{ backgroundColor: '#415A77', borderRadius: 20, width: '45vw', height:300, color:'white' }}>
            <CardContent>
                <PieChart
                    series={[
                        {
                            data: chartData,
                        },
                    ]}
                    width={550}
                    height={275}
                />
            </CardContent>
        </Card>
    )
}

export default Chart
