import React from 'react'
import RatingCard from './RatingCard'

export default function Rating() {
  return (
    <>
    <div className="container my-3">
        <div className="row">
            <RatingCard title="CodeForces" text="Ishaan Mittal" handle="ishaan"/>
            <RatingCard title="HackerRank" text="Aryan Kulkarni" handle="AK2507"/>
            <RatingCard title="HackerEarth" text="Sai Abhinav" handle="kssabhinav"/>
            <RatingCard title="CodeChef" text="Monil Pitliya" handle="monil.pitliya2003"/>
            <RatingCard title="LeetCode" text="Shubhneet Tiwari" handle="shubhtwr96"/>
            <RatingCard title="GeeksForGeeks" text="Vinay Desai" handle="vinaydesai2003"/>
            <RatingCard title="CodeWars" text="Harsh Soni" handle="HarshSoni1"/>
            <RatingCard title="TopCoder" text="Purav Biyani" handle="avicii101"/>
        </div>
    </div>
    </>
  )
}
