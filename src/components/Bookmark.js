import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Bookmark = () => {
    const Initial = []
    const [problems, setProblems] = useState(Initial);

    // Get Notes
    const getProblems = async ()=>{

      const response = await fetch(`http://localhost:5000/api/bookmark/fetchallbookmarks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')    
        },
      });
      const json = await response.json();
      console.log(json)
      setProblems(json)         
    }

    const deleteProblem = async (id)=>{

        const response = await fetch(`http://localhost:5000/api/bookmark/deletebookmark/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')    
          },
        });
        const json = await response.json();
        console.log(json)
  
  
        console.log("Deleting Problem with id "+ id)
        const newProblems = problems.filter((problem)=>{return problem._id!==id})
        setProblems(newProblems);
      }

    useEffect(() => {
        if(localStorage.getItem('token')){
          console.log(localStorage.getItem('token'))
          getProblems();
        }
      }, [])

      return (
        <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
            {problems.length > 0 && (
                <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">
                    {/* :TABLE HEAD */}
                    <thead className="min-w-full bg-gray-800 text-left text-gray-100">
                        <tr>
                            {/* ::Name */}
                            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Index</th>
                            <th className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">Name</th>
                            {/* Add more table headers if needed */}
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
                                    <Link onClick={() => deleteProblem(problem._id)} className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500 cursor-pointer">Remove</Link>
                                    {/* :::delete button */}
                                    <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500" rel="noreferrer">Solve</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
    
}

export default Bookmark
