import React from 'react'
import RatingCard from './RatingCard'

export default function Rating(props) {
  return (
    <>
    <div className="container my-3">
        <div className="row">
            <RatingCard title="CodeForces" text={props.name} handle={props.handle}/>
        </div>
    </div>
    </>
  )
}
