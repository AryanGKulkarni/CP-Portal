import React from 'react';
import { useEffect, useState } from 'react';
import RatingCard from './RatingCard'
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
  }, [API, navigate]);

  const count = submissions.filter(submission => submission.verdict === 'OK').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Rating" />
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Submissions" count={count} />
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Rating" />
        </div>
        <div style={{ flex: '1' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Submissions" count={count} />
        </div>
      </div>

      <div className="my-8">
        <Bookmark />
      </div>

      <div className="my-8">
        <RatingGraph handle={props.handle} />
      </div>
    </div>
  );
}
