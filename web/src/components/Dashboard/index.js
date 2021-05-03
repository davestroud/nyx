import React, { useState } from "react";
import {
  Container,
  Drawer,
  Grid,
  Typography,
  Tabs,
  Tab,
  Divider 
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import WordCloudGallery from './WordClouds'
import InsightsGallery from './Insights'
import BookInsightGallery from './BookInsights'

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
      paddingLeft: 240
  }
});

function DashboardContainer(props) {
  const { visible } = props
  const classes = useStyles();
  const [currentTab, setTab] = useState("tab1");
  const changeTab = (_, v) => setTab(v);
  console.log(currentTab)

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
          <Grid alignItems="center" direction="column" alignContent="center" justify='center' container>
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
            indicatorColor="persistent"
            className={classes.rightTabs}
          >
            <Tab label="Market Insights" value="tab1" key="market tab" />
            <Tab label="Book Insights" value="tab2" key="testing tab" />
            <Tab label="Wordclouds" value="tab3" key="Wordclouds tab" />
          </Tabs>
        </Drawer>
        <Container className={classes.content}>
        <TabPanel value="tab1" key="dashboard-tab1-panel">
          <InsightsGallery/>
        </TabPanel>
        <TabPanel value="tab2" key="dashboard-tab2-panel">
          <BookInsightGallery/>
        </TabPanel>
        <TabPanel value="tab3" key="dashboard-tab3-panel">
          <WordCloudGallery/>
        </TabPanel>
        </Container>
      </TabContext>
    </Container>
  );
}

export default DashboardContainer;
