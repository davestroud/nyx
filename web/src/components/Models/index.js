import React, { useState } from "react";
import {
  Container,
  Drawer,
  Grid,
  Typography,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import DrewModelContainer from './DrewModel'
import IndyModelContainer from './RFDescEval'
import DeepDescContainer from './DeepDesc'

const drawerWidth = 240;
const useStyles = makeStyles({
  rightTabs: {
    marginLeft: "auto",
  },
  leftTabs: {
    textColor: "black",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    paddingLeft: 240,
  },
});

function ModelContainer(props) {
  const { visible } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState("models1");
  const changeTab = (_, v) => setTab(v);

  return (
    <Container>
      <TabContext value={currentTab}>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="persistent"
          open={visible}
          anchor="left"
        >
          <Grid
            alignItems="center"
            direction="column"
            alignContent="center"
            justify="center"
            container
          >
            <Grid item>
              <Typography variant="h2">NYX</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">Publishing</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Tabs
            onChange={changeTab}
            orientation="vertical"
            variant="scrollable"
            value={currentTab}
            indicatorColor="primary"
            className={classes.rightTabs}
          >
            <Tab label="Rating Predictor" value="models1" key="models tab1" />
            <Tab label="Description Evaluator" value="models2" key="models tab2" />
            <Tab label="Deep Description Evaluator" value="models3" key="models tab3" />
          </Tabs>
        </Drawer>
        <Container className={classes.content}>
          <TabPanel value="models1" key="models-tab1-panel">
            <DrewModelContainer/>
          </TabPanel>
          <TabPanel value="models2" key="models-tab2-panel">
            <IndyModelContainer />
          </TabPanel>
          <TabPanel value="models3" key="models-tab3-panel">
            <DeepDescContainer />
          </TabPanel>
        </Container>
      </TabContext>
    </Container>
  );
}

export default ModelContainer;
