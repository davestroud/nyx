import React, { useState } from "react";
import {
  Container,
  Tab,
  Tabs,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import DashboardContainer from "./components/Dashboard";
import ModelContainer from "./components/Models";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  rightTabs: {
    marginLeft: "auto",
  },
  leftTabs: {
    textColor: "black",
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
  },
}));

function App() {
  const classes = useStyles();
  const [currentTab, setTab] = useState("dashboard");

  const changeTab = (_, v) => setTab(v);

  console.log(currentTab);
  return (
    <Container disableGutters>
      <TabContext value={currentTab}>
        <AppBar
        disableGutters
          position="sticky"
          color="primary"
          key="header-app-bar"
          className={classes.appBar}
        >
          <Toolbar disableGutters>
            <Tabs
              onChange={changeTab}
              value={currentTab}
              indicatorColor="primary"
              className={classes.rightTabs}
            >
              <Tab label="Dashboard" value="dashboard" key="dashboard tab" />
              <Tab label="Models" value="models" key="models tab" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container>
          <TabPanel value="dashboard" key="dashboard-tab-panel" index={0}>
            <DashboardContainer visible={currentTab === "dashboard"} />
          </TabPanel>
          <TabPanel value="models" key="models-tab-panel" index={1}>
            <ModelContainer visible={currentTab === "models"} />
          </TabPanel>
        </Container>
      </TabContext>
    </Container>
  );
}

export default App;
