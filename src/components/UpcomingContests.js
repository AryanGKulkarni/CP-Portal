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
    // <div>
    //   <h2>Upcoming Contests</h2>
    //   <ul>
    //     {contests.map(contest => (
    //       <li key={contest.id}>
    //         <a href="https://codeforces.com/contests" target="_blank"><h3>{contest.name}</h3></a>
    //         <p>Start Time: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
      <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">

        {/* :TABLE HEAD */}
        <thead className="min-w-full bg-gray-800 text-left text-gray-100">
          <tr>
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Name</th>
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Type</th>
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Date</th>
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Time</th>
          </tr>
        </thead>


        {/* :TABLE BODY */}
        <tbody className="">
          {contests.map((contest, index) => (
            <tr key={contest.name} className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} whitespace-nowrap`}>
              {/* ::User Name */}
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{contest.name}</td>
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{contest.type}</td>
              {/* <td className="py-3 px-4 text-base text-gray-200 font-semibold">{`${((new Date(contest.startTimeSeconds * 1000)).getFullYear).toLocaleString()}-${(new Date(contest.startTimeSeconds * 1000)).getMonth < 10 ? '0' + (new Date(contest.startTimeSeconds * 1000)).getMonth : (new Date(contest.startTimeSeconds * 1000)).getMonth}-${(new Date(contest.startTimeSeconds * 1000)).getDate < 10 ? '0' + (new Date(contest.startTimeSeconds * 1000)).getDate : (new Date(contest.startTimeSeconds * 1000)).getDate}`}</td>
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{`${(new Date(contest.startTimeSeconds * 1000)).getHours < 10 ? '0' + (new Date(contest.startTimeSeconds * 1000)).getHours : (new Date(contest.startTimeSeconds * 1000)).getHours}:${(new Date(contest.startTimeSeconds * 1000)).getMinutes < 10 ? '0' + (new Date(contest.startTimeSeconds * 1000)).getMinutes : (new Date(contest.startTimeSeconds * 1000)).getMinutes}`}</td> */}
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{new Date(contest.startTimeSeconds * 1000).toLocaleTimeString()}</td>
              <td className="py-3 px-4 flex justify-around items-center space-x-6 text-base text-gray-700 font-medium">
                {/* :::edit button */}
                <a type="button" href="https://codeforces.com/contests" target="_blank" className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500">Enter</a>
              </td>
            </tr>
          ))
          }
        </tbody>

      </table>
    </div>
  );
};

export default UpcomingContests;