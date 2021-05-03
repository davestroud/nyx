import React, { useState } from "react";
import {
  Container,
  Button,
  Slider,
  Grid,
  Typography,
  TextField,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

function IndyModelContainer() {
  const [desc, setDesc] = useState("");
  const [prediction, setPrediction] = useState(null);
  console.log(prediction)

  const getPredict = () => {
    axios.post("https://projectnyx.org/modelapi/indymodel",
  {
    text: desc
  }
  ).then((v) => {
    setPrediction(v.data.result)});}
  
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
            <Typography variant='h4'>{prediction?"Estimated chance of being 4-stars or better: "+(prediction*100).toFixed(2):"Description Rating Evaluator"}</Typography>
          </Grid>
          <Grid item>
          <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          rowsMax={20}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
          </Grid>
        <Grid item>
        <Button onClick={getPredict} color='primary' size='large'>Predict</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default IndyModelContainer;
