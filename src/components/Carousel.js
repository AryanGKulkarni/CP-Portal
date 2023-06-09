import React from 'react'
import image from '../images/image.png'

export default function Carousel() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={image} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={image} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={image} className="d-block w-100" alt="..."/>
            </div>
        </div>
    </div>
  )
}
