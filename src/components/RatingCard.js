import React from 'react'
import img1 from '../images/codeforces_logo.png'

export default function RatingCard(props) {    
  return (
    <div class="card text-bg-dark mx-3 my-3" style={{maxWidth: "18rem"}}>
        <div class="row g-0">
            <div class="col-md-4">
                <img src={img1} class="img-fluid rounded-start" alt="..."/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text">{props.text}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
