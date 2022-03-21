import { CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { countrySelector } from "../../atoms/countries.state";
import { ChangePageTitle } from "../../shared/ChangePageTitle";
import { CountryView } from "./CountryView";

export function CountryPage() {
  const { countryId } = useParams();
  const country = useRecoilValueLoadable(countrySelector(countryId));

  switch (country.state) {
    case "hasValue":
      if (country.contents) {
        return (
          <Grid
            container
            direction='column'
            flexWrap='nowrap'
            sx={{ overflow: "auto" }}
          >
            <ChangePageTitle
              pageTitle={`Where in the World! - ${country.contents.name.common}`}
            />
            <CountryView country={country.contents} />
          </Grid>
        );
      }
      // if country code doesn't exist, redirect to the main page
      return <Navigate to='/' />;
    case "loading":
    default:
      return (
        <Grid
          container
          direction='column'
          flexWrap='nowrap'
          justifyContent='center'
          alignItems='center'
          sx={{ height: "100%" }}
        >
          <CircularProgress size={160} />
        </Grid>
      );
    case "hasError":
      return (
        <Grid
          container
          direction='column'
          flexWrap='nowrap'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h2'>
            There was an error loading the countries.
          </Typography>
        </Grid>
      );
  }
}
