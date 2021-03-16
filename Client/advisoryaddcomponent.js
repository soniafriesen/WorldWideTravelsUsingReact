import React, { useReducer, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import earth from "./assets/earth.png";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  TextField,
  Button,
  CardActions,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import theme from "./theme";
import "../App.css";

const AdvisoryAdd = (props) => {
  // reset is for changing the key of autocomplete in order to re-render with default values
  const initialState = {
    countries: [],
    travellerName: "",
    selectedcountry: "",
    reset: false,
  };
  const GRAPHURL = "/graphql";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAdvisory = async () => {
    try {
      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          query: `mutation {addadvisory(travellername: "${state.travellerName}", name: "${state.selectedcountry}") {travellername,name,date, text}}`,
        }),
      });
      let json = await response.json();
      props.dataFromChild(`added advisory on ${json.data.addadvisory.date}`);
      setState({
        travellerName: "",
        selectedcountry: "",
        reset: true,
      });
    } catch (error) {
      console.log(error);
      props.dataFromChild(`Problem loading server data - ${error.message}`);
    }
  };

  const fetchCountries = async () => {
    try {
      props.dataFromChild("running setup...");

      let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ query: "{countries}" }),
      });
      let json = await response.json();

      props.dataFromChild(`found ${json.data.countries.length} countries`);

      setState({
        countries: json.data.countries,
      });
    } catch (error) {
      console.log(error);
      props.dataFromChild(`Problem loading server data - ${error.message}`);
    }
  };

  const onChange = (e, selectedOption) => {
    selectedOption
      ? setState({ selectedcountry: selectedOption })
      : setState({ selectedcountry: "" });
  };

  const handleTravelledNameInput = (e) => {
    setState({ travellerName: e.target.value });
  };

  const emptyorundefined =
    state.travellerName === undefined ||
    state.travellerName === "" ||
    state.selectedcountry === undefined ||
    state.selectedcountry === "";
  return (
    <MuiThemeProvider theme={theme}>
      <Card>
        <CardMedia style={{ textAlign: "center", paddingTop: "3vh" }}>
          <img className="photo" src={earth} alt="earth"></img>
        </CardMedia>
        <CardHeader
          title="World Wide Travel Alerts"
          color="inherit"
          style={{
            textAlign: "center",
            paddingTop: "1vh",
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            color="secondary"
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Add Advisory
          </Typography>
          <TextField
            label="Traveller's name"
            onChange={handleTravelledNameInput}
            value={state.travellerName}
            style={{ paddingTop: "2vh", paddingBottom: 0 }}
          />
          <Autocomplete
            id="country"
            options={state.countries}
            getOptionLabel={(option) => option}
            style={{ width: 300, paddingTop: "2vh", paddingBottom: 0 }}
            onChange={onChange}
            key={state.reset}
            renderInput={(params) => (
              <TextField
                {...params}
                label="countries"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <br />

          <CardActions style={{ justifyContent: "center" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={addAdvisory}
              disabled={emptyorundefined}
            >
              ADD ADVISORY
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

export default AdvisoryAdd;
