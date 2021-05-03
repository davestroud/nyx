import React from "react";
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: './bookinsights/bookratingimportance.png',
    description: 'Feature Weights for Final Ratings Prediction Model'
  },{
    original: './bookinsights/genreimportance.png',
    description: 'Feature Weights for Simple Ratings Prediction Model'
  },
{original: './bookinsights/Average Rating by Page Length- Children.png'},
{original: './bookinsights/Average Rating by Page Length- Comic Graphic.png'},
{original: './bookinsights/Average Rating by Page Length- Fiction.png'},
{original: './bookinsights/Average Rating by Page Length- Romance.png'},
{original: './bookinsights/Average Rating by Page Length- Thriller Mystery Crime.png'},
{original: './bookinsights/Average Rating by Page Length- Young Adult.png'},
{original: './bookinsights/Book Description Rating Random Forest Weights .png'},

];

function BookInsightGallery (){
    return <ImageGallery items={images} showThumbnails={false} showPlayButton={false}/>
}


export default BookInsightGallery