import React from 'react';
import { useEffect} from 'react';
import RatingCard from './RatingCard'
import RatingGraph from './RatingGraph';
import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import SubmissionCount from './SubmissionCount';
import Streak from './Streak';

export default function UserProfile(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Rating" />
        </div>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <RatingCard title="CodeForces" handle={props.handle} name="Max Rating"/>
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

      <div className="my-8">
        <Bookmark />
      </div>

      <div className="my-8">
        <RatingGraph handle={props.handle} />
      </div>
    </div>
  );
}
