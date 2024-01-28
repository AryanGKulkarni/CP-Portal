import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart} from '@mui/x-charts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const RatingGraph = (props) => {
  const [ratingData, setRatingData] = useState(null);
  let API = `https://codeforces.com/api/user.rating?handle=${props.handle}`

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setRatingData(data);
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchRatingData();
  }, [API]);

  if (!ratingData) {
    return <div>Loading...</div>;
  }

  const last10Entries = ratingData.result.slice(-12);

  const timeData = last10Entries ? last10Entries.map((entry) => new Date(entry.ratingUpdateTimeSeconds * 1000)) : [];
  const ratingDataArray = last10Entries ? last10Entries.map((entry) => entry.newRating) : [];

  // console.log(timeData)
  // console.log(ratingDataArray)

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <Card style={{ width: 600, backgroundColor: '#1B263B', borderRadius: 20}}>
          <CardContent>
            <LineChart
              xAxis={[
                {
                  data: timeData,
                  scaleType: 'time',
                  tickFormatter: (tick) => new Date(tick).toLocaleDateString(),
                },
              ]}
              series={[
                {
                  data: ratingDataArray,
                  color: '#E0E1DD',
                },
              ]}
              width={500}
              height={300}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default RatingGraph;
