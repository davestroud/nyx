import React, { useState } from "react";
import {
  Container,
  Button,
  Slider,
  Grid,
  Typography,
  Switch,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

function DrewModelContainer() {
  const [isSeries, setIsSeries] = useState(false);
  const [textReviewCountAuthor, setTextReviewCountAuthor] = useState(100);
  const [ratingCountAuthor, setRatingCountAuthor] = useState(100);
  const [isEBook, setIsEBook] = useState(false);
  const [numPages, setNumPages] = useState(100);
  const [pubDay, setPubDay] = useState(5);
  const [pubMon, setPubMon] = useState(6);
  const [descLen, setDescLen] = useState(150);
  const [titleLen, setTitleLen] = useState(10);
  const [genre, setGenre] = useState("No_Genre");
  const [prediction, setPrediction] = useState(null);

  const getPredict = () => {
    axios
      .post("https://projectnyx.org/modelapi/drewmodel", {
        is_series: isSeries,
        text_reviews_count_aut: textReviewCountAuthor,
        ratings_count_aut: ratingCountAuthor,
        is_ebook: isEBook,
        num_pages: numPages,
        publication_day: pubDay,
        publication_month: pubMon,
        desc_length: descLen,
        title_length: titleLen,
        genre: genre,
      })
      .then((v) => {
        setPrediction(v.data.result);
      });
  };

  const boolOptions = [
    {
      label: "Is this a series?",
      checked: isSeries,
      onChange: (_, v) => setIsSeries(!isSeries),
      color: "primary",
    },
    {
      label: "Is this an eBook?",
      checked: isEBook,
      onChange: (_, v) => setIsEBook(!isEBook),
      color: "primary",
    },
  ];

  const sliderOptions = [
    {
      label: "Text Reviews Count for the Author",
      value: textReviewCountAuthor,
      onChange: (_, v) => setTextReviewCountAuthor(v),
      min: 0,
      max: 448570,
      type: "number",
      valueLabelDisplay: "on",
    },
    {
      label: "Rating Count for the Author",
      value: ratingCountAuthor,
      onChange: (_, v) => setRatingCountAuthor(v),
      min: 0,
      max: 18532720,
      type: "number",
      valueLabelDisplay: "on",
    },
    {
      label: "Number of Pages",
      value: numPages,
      onChange: (_, v) => setNumPages(v),
      min: 0,
      max: 500.0,
      type: "number",
      valueLabelDisplay: "on",
    },
    {
      label: "Publication Day",
      value: pubDay,
      onChange: (_, v) => setPubDay(v),
      min: 1,
      max: 31,
      type: "number",
      valueLabelDisplay: "on",
    },
    {
      label: "Publication Month",
      value: pubMon,
      onChange: (_, v) => setPubMon(v),
      min: 1,
      max: 12,
      type: "number",
      valueLabelDisplay: "on",
    },
    {
      label: "Description Length",
      value: descLen,
      onChange: (_, v) => setDescLen(v),
      min: 0,
      max: 45160,
      type: "number",
      valueLabelDisplay: "on",
    },
    ,
    {
      label: "Title Length",
      value: titleLen,
      onChange: (_, v) => setTitleLen(v),
      min: 0,
      max: 255,
      type: "number",
      valueLabelDisplay: "on",
    },
  ];

  const genres = [
    "No_Genre",
    "children",
    "comics",
    "fantasy",
    "fiction",
    "mystery",
    "non-fiction",
    "poetry",
    "romance",
    "young-adult",
  ];

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">
            {prediction
              ? "Estimated Score: " + prediction.toFixed(2) + " Stars"
              : "Book Rating Predictor"}
          </Typography>
        </Grid>
        {boolOptions.map((x) => (
          <Grid item container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h6">{x.label}</Typography>
            </Grid>
            <Grid item>
              <Switch {...x} />
            </Grid>
          </Grid>
        ))}

        {sliderOptions.map((x) => (
          <Grid item container direction="column" justify="space-between">
            <Grid item>
              <Typography variant="h6">{x.label}</Typography>
            </Grid>
            <Grid item>
              <Slider {...x} defaultValue={0} />
            </Grid>
          </Grid>
        ))}
        <Grid item container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="h6">Genre</Typography>
          </Grid>
          <Grid item>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              input={<Input />}
              defaultValue="No_Genre"
            >
              {genres.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item>
          <Button onClick={getPredict} color="primary" size="large">
            Predict
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DrewModelContainer;
