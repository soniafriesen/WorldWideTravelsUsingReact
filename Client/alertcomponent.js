import React, { useReducer, useEffect } from "react";
import earth from "./assets/earth.png";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Typography,
} from "@material-ui/core";
import theme from "../project1/theme";
import "../App.css";

const AlertComponent = (props) => {
  const initialState = {
    resArr: [],
  };
  const GRAPHURL = "/graphql";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAlerts = async () => {
    try {
      props.dataFromChild("running setup...");
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ query: "{setupalert{results}}" }),
      });
      let json = await response.json();
      props.dataFromChild("alerts collection setup completed");
      setState({
        resArr: json.data.setupalert.results
          .replace(/([.])\s*(?=[A-Z])/g, "$1|")
          .split("|"),
      });
    } catch (error) {
      console.log(error);
      props.dataFromChild(`Problem loading server data - ${error.message}`);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardMedia style={{ textAlign: "center", paddingTop: "3vh" }}>
          <img className="photo" src={earth} alt="earth"></img>
        </CardMedia>
        <CardHeader
          title="World Wide Travel Alerts"
          color="primary"
          style={{ textAlign: "center", paddingTop: "1vh" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            color="secondary"
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Alert Setup - Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {state.resArr.map((row) => (
                  <TableRow key={state.resArr.indexOf(row)}>
                    <TableCell
                      style={{ color: "rgba(16, 130, 104, 1)", fontSize: 20 }}
                      component="th"
                      scope="row"
                    >
                      {row}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

export default AlertComponent;
