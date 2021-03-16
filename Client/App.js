import React, { useReducer } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Reorder from "@material-ui/icons/Reorder";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import theme from "./theme";
import Home from "./project1/home";
import AlertComponent from "./project1/alertcomponent";
import AdvisoryAdd from "./project1/advisoryaddcomponent";
import AdvisoryList from "./project1/listadvisorycomponent";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";

const App = () => {
  const initialState = {
    snackBarMsg: "",
    msgFromParent: "data from parent",
    gotData: false,
    anchorEl: null,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleClose = () => {
    setState({ anchorEl: null });
  };
  const handleClick = (event) => {
    setState({ anchorEl: event.currentTarget });
  };
  const snackbarClose = () => {
    setState({ gotData: false });
  };
  const msgFromChild = (msg) => {
    setState({ snackBarMsg: msg, gotData: true });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO-3139 Case Study #1
          </Typography>
          <IconButton
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <Reorder />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/reset" onClick={handleClose}>
              Reset Alerts
            </MenuItem>
            <MenuItem component={Link} to="/advisory" onClick={handleClose}>
              Add Advisory
            </MenuItem>
            <MenuItem component={Link} to="/list" onClick={handleClose}>
              List Advisory
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/reset">
          <AlertComponent dataFromChild={msgFromChild} />
        </Route>
        <Route path="/advisory">
          <AdvisoryAdd dataFromChild={msgFromChild} />
        </Route>
        <Route path="/list">
          <AdvisoryList dataFromChild={msgFromChild} />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </div>
      <Snackbar
        open={state.gotData}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </MuiThemeProvider>
  );
};
export default App;
