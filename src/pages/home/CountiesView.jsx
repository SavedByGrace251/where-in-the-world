import { Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { CountryCards } from "../../shared/CountryCards";
import {
  filterSearchState,
  filterRegionsState,
  filterSubregionsState,
} from "../../atoms/filter.state";
import { RegionSelect } from "./components/RegionSelect";
import { SearchBox } from "./components/SearchBox";

export function CountiesView({ countries }) {
  const searchText = useRecoilValue(filterSearchState);
  const selectedRegions = useRecoilValue(filterRegionsState);
  const selectedSubegions = useRecoilValue(filterSubregionsState);

  var filteredCountries = countries.filter((c) => {
    return (
      (selectedRegions.length > 0
        ? selectedRegions.includes(c.region)
        : true) &&
      (selectedSubegions.length > 0
        ? selectedSubegions.includes(c.subregion)
        : true) &&
      (c.name.official.toLowerCase().includes(searchText.toLowerCase()) ||
        c.name.common.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <Grid
      container
      direction='column'
      alignItems='stretch'
      flexWrap='nowrap'
      sx={{ flex: 1 }}
    >
      <Grid sx={{ p: 2, mt: 2, mb: 2 }} item>
        <Grid container justifyContent='space-between' spacing={2}>
          <SearchBox />
          <RegionSelect />
        </Grid>
      </Grid>
      <Grid sx={{ flex: 1, overflow: "hidden" }} item>
        <CountryCards countries={filteredCountries} />
      </Grid>
    </Grid>
  );
}
