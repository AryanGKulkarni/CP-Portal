import React from 'react';
import { useEffect } from 'react';
import RatingCard from './RatingCard'
import RatingGraph from './RatingGraph';
import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import SubmissionCount from './SubmissionCount';
import Streak from './Streak';
import Chart from './Chart'
import Unsolved from './Unsolved';
import { useGlobalContext } from '../context/Context';

export default function UserProfile(props) {
  let API = `https://codeforces.com/api/user.status?handle=${props.handle}`;
  const { updateGlobalVariable } = useGlobalContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        updateGlobalVariable(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [API, navigate, updateGlobalVariable]);

  return (
    <div className="container mx-auto px-4 my-4">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Rating" />
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Max Rating" />
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Streak title="CodeForces" handle={props.handle} name="Current Streak" />
        </div>
        <div style={{ flex: '1' }}>
          <Streak title="CodeForces" handle={props.handle} name="Longest Streak" />
        </div>
        <div style={{ flex: '1' }}>
          <SubmissionCount title="CodeForces" handle={props.handle} name="Submissions" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="my-4">
          <Bookmark />
        </div>

        <div className="my-4" style={{ flex: 1, marginLeft: '60px' }}>
          <Chart handle={props.handle} />
        </div>

        <div className="my-4">
          <RatingGraph handle={props.handle} />
        </div>

        <div className="my-4" style={{ flex: 1, marginLeft: '60px' }}>
          <Unsolved handle={props.handle} />
        </div>
      </div>
    </div>
  );
}
