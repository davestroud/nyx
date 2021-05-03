import React, { useState } from "react";
import ImageGallery from 'react-image-gallery';

const images = [
{original: './insights/Average Rating by Page Length.png'},
{original: './insights/Average Rating by Year by Genre.png'},
{original: './insights/Average Rating by Year.png'},
{original: './insights/Books Published by Year.png'},
{original: './insights/Rating Count by Year by Genre.png'},
{original: './insights/Rating Prediction Linear Model Weights.png'},
{original: './insights/Rating Prediction Random Forest Weights.png'},
];

function InsightsGallery (){
    return <ImageGallery items={images} showThumbnails={false} showPlayButton={false}/>
}


export default InsightsGallery