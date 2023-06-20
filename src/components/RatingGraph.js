import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RatingGraph = () => {
  const [ratingData, setRatingData] = useState(null);

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await fetch('https://codeforces.com/api/user.rating?handle=AK2507');
        const data = await response.json();
        setRatingData(data);
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    };

    fetchRatingData();
  }, []);

  if (!ratingData) {
    return <div>Loading...</div>;
  }

  const data = ratingData.result.map((entry) => ({
    time: new Date(entry.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
    rating: entry.newRating,
  }));

  return (
    <div>
      <h1>Rating Graph</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" dot={{ strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
