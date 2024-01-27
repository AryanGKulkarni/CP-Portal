import React from 'react';
import { useEffect, useState } from 'react';
import Rating from './Rating';
import RatingGraph from './RatingGraph';
import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';

export default function UserProfile(props) {
  let API = `https://codeforces.com/api/user.status?handle=${props.handle}`;
  const [submissions, setSubmissions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setSubmissions(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [API,navigate]);

  const count = submissions.filter(submission => submission.verdict === 'OK').length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-3xl font-bold">{props.name}</h2>
      <Rating name={props.name} handle={props.handle} />

      <div className="my-8">
        <h3 className="text-xl font-semibold">Solved Counts</h3>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-200 mt-4">
            <thead className="bg-gray-800 text-gray-100">
              <tr>
                <th className="py-2 px-4">CodeChef</th>
                <th className="py-2 px-4">CodeForces</th>
                <th className="py-2 px-4">LeetCode</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4">{count}</td>
                <td className="py-2 px-4">{count}</td>
                <td className="py-2 px-4">{count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="my-8">
        <Bookmark />
      </div>

      <div className="my-8">
        <RatingGraph handle={props.handle} />
      </div>
    </div>
  );
}
