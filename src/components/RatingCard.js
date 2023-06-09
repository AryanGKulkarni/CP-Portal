import React from 'react'
import img1 from '../images/codeforces_logo.png'
import { useEffect } from 'react';
import { useState } from 'react'

export default function RatingCard(props) {   
    
    let API = "https://codeforces.com/api/user.info?handles="+`${props.handle}`;
    const [rating, setRating] = useState(0);

    const fetchAPIData = async(url)=>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.result[0].rating);
            setRating(data.result[0].rating);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAPIData(API);
    }, []);    
    


  return (
    <div className="card text-bg-dark mx-3 my-3" style={{maxWidth: "18rem"}}>
        <div className="row g-0">
            <div className="col-md-4">
                <img src={img1} className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{rating}</p>
                    <p className="card-text">{props.text}</p>
                </div>
            </div>
        </div>
    </div>
  )
}