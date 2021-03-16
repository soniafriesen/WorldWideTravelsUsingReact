import React from "react";
import earth from "./assets/earth.png";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  AppBar,
  CardHeader,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import theme from "./theme";
import "../App.css";
const HomePage = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary"></AppBar>
      <Card style={{ marginTop: "20%" }}>
        <CardMedia style={{ textAlign: "center", paddingTop: "3vh" }}>
          <img className="photo" src={earth} alt="earth"></img>
        </CardMedia>
        <CardHeader
          title="World Wide Alerts"
          color="primary"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <div className="copyRight" alt="copy">
            INFO3139 - 2021
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};
export default HomePage;
