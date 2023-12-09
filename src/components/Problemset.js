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
    // <div>
    //   <table className="table">
    //     <thead>
    //       <tr>
    //         <th scope="col">Index</th>
    //         <th scope="col">Name</th>
    //         <th scope="col">Tags</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {problems.map((problem, index) => (
    //         <tr key={index}>
    //           <td>{problem.index}</td>
    //           <td><link href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank'>{problem.name}</link></td>
    //           <td>{problem.tags.join(", ")}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
      <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">

        {/* :TABLE HEAD */}
        <thead className="min-w-full bg-gray-800 text-left text-gray-100">
          <tr>
            {/* ::Name */}
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Index</th>
            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Name</th>
          </tr>
        </thead>


        {/* :TABLE BODY */}
        <tbody className="">
          {problems.map((problem, index) => (
            <tr key={problem.index} className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} whitespace-nowrap`}>
              {/* ::User Name */}
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{problem.index}</td>
              <td className="py-3 px-4 text-base text-gray-200 font-semibold">{problem.name}</td>
              <td className="py-3 px-4 flex justify-around items-center space-x-6 text-base text-gray-700 font-medium">
                {/* :::edit button */}
                <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500">Bookmark</a>
                {/* :::delete button */}
                <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500">Solve</a>
              </td>
            </tr>
          ))
          }
        </tbody>

      </table>
    </div>
  );
}
