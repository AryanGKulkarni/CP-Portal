import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useGlobalContext } from '../context/Context';

const Chart = (props) => {
    const { globalVariable } = useGlobalContext();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = globalVariable;
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
    }, [globalVariable]);
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
