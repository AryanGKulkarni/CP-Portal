import React, { useEffect, useState } from 'react';

export default function Problemset() {
  const API = "https://codeforces.com/api/problemset.problems";
  const [problems, setProblems] = useState([]);

  const fetchAPIData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProblems(data.result.problems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIData(API);
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Name</th>
            <th scope="col">Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index}>
              <td>{problem.index}</td>
              <td><a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank'>{problem.name}</a></td>
              <td>{problem.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
