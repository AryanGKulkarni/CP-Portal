import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const addBookmark = async (data) => {

    const response = await fetch(`http://localhost:5000/api/bookmark/addbookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    });
    const bm = await response.json();
    console.log(bm)
  }

  useEffect(() => {
    fetchAPIData(API);
  }, []);

  return (
    <div className="mx-auto pb-8 w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md border border-gray-200">
          {/* :TABLE HEAD */}
          <thead className="bg-gray-800 text-left text-gray-100">
            <tr>
              <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide">Index</th>
              <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide">Name</th>
              {/* <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide">Tags</th> */}
              <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide">Actions</th>
            </tr>
          </thead>

          {/* :TABLE BODY */}
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem.name} className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} whitespace-nowrap`}>
                <td className="py-3 px-4 text-base text-gray-200 font-semibold">{problem.index}</td>
                <td className="py-3 px-4 text-base text-gray-200 font-semibold">{problem.name}</td>
                {/* <td className="py-3 px-4 text-base text-white font-semibold">{problem.tags.join(", ")}</td> */}
                <td className="py-3 px-4">
                  <div className="flex space-x-6">
                    <Link onClick={() => addBookmark(problem)} className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500 cursor-pointer">Bookmark</Link>
                    <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500" rel="noreferrer">Solve</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



  );
}
