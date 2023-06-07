import React from 'react'
import RatingCard from './RatingCard'

export default function Rating() {
  return (
    <>
    <div className="container my-3">
        <div className="row">
            <RatingCard title="CodeForces" text="Your Rating"/>
            <RatingCard title="HackerRank" text="Your Rating"/>
            <RatingCard title="HackerEarth" text="Your Rating"/>
            <RatingCard title="CodeChef" text="Your Rating"/>
            <RatingCard title="LeetCode" text="Your Rating"/>
            <RatingCard title="GeeksForGeeks" text="Your Rating"/>
            <RatingCard title="CodeWars" text="Your Rating"/>
            <RatingCard title="TopCoder" text="Your Rating"/>
        </div>
    </div>
    </>
  )
}
