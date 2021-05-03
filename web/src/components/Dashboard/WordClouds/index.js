import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: './wordclouds/fantasy_genre.png',
    description: 'Fantasy Genre Significant Words'
  },{
    original: './wordclouds/romance_genre.png',
    description: 'Romance Genre Significant Words'
  },{
    original: './wordclouds/thriller_genre.png',
    description: 'Thriller Genre Significant Words'
  },{
    original: './wordclouds/young_adult_genre.png',
    description: 'Young Adult Genre Significant Words'
  },
];

function WordCloudGallery (){
    return <ImageGallery items={images} showThumbnails={false} showPlayButton={false}/>
}


export default WordCloudGallery