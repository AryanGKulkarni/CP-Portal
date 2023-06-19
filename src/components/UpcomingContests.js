import React, { useState, useEffect } from 'react';

const UpcomingContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchUpcomingContests();
  }, []);

  const fetchUpcomingContests = async () => {
    try {
      const response = await fetch('https://codeforces.com/api/contest.list');
      const data = await response.json();
      const upcomingContests = data.result.filter(contest => contest.phase === 'BEFORE');
      setContests(upcomingContests);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upcoming Contests</h2>
      <ul>
        {contests.map(contest => (
          <li key={contest.id}>
            <a href="https://codeforces.com/contests" target="_blank"><h3>{contest.name}</h3></a>
            <p>Start Time: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingContests;