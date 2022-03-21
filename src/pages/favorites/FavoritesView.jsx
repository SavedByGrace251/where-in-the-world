import { CountryCards } from "../../shared/CountryCards";
import { ChangePageTitle } from "../../shared/ChangePageTitle";
import { DynamicBackButton } from "../../shared/DynamicBackButton";
import { Grid, Typography } from "@mui/material";

export function FavoritesView({ countries }) {
  return (
    <Grid
      container
      direction='column'
      alignItems='stretch'
      flexWrap='nowrap'
      sx={{ flex: 1 }}
    >
      <ChangePageTitle pageTitle={`Where in the World! - Favorites`} />
      <Grid item sx={{ p: 4 }}>
        <DynamicBackButton />
      </Grid>
      <Grid sx={{ flex: 1, overflow: "hidden" }} item>
        {countries.length > 0 ? (
          <CountryCards countries={countries} />
        ) : (
          <Grid container justifyContent='center'>
            <Typography variant='h5'>There are no favorites selected.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
