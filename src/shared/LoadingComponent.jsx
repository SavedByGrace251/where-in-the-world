import { CircularProgress, Grid, Typography } from "@mui/material";

export function LoadingComponent({ recoilValue, children }) {
  switch (recoilValue.state) {
    case "hasValue":
      return children(recoilValue.contents);
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
