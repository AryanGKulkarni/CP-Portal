import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Rating from './Rating';
import RatingGraph from './RatingGraph';

export default function UserProfile(props) {
    let API="https://codeforces.com/api/user.status?handle="+`${props.handle}`
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
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
    }, []);

  const count = submissions.filter(submission => submission.verdict === 'OK').length;


  return (
    <>
        <h2>{props.name}</h2>
        <Rating name={props.name} handle={props.handle}/>
        <h3>Solved Counts</h3>
        <div class="table-responsive my-3">
            <table class="table">
                <tr>
                    <th>CodeChef</th>
                    <th>CodeForces</th>
                    <th>LeetCode</th>
                </tr>
                <tr>
                    <td>{count}</td>
                    <td>{count}</td>
                    <td>{count}</td>
                </tr>
            </table>
        </div>
        <div className="my-3">
            <RatingGraph handle={props.handle}/>
        </div>
    </>
  )
}
