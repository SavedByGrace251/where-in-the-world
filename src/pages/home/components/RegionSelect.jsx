import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { filterRegionsState } from "../../../atoms/filter.state";
import { countriesState } from "../../../atoms/countries.state";

function determineRegions(countries) {
  var regions = [];

  countries.forEach((country) => {
    if (!regions.includes(country.region)) {
      regions.push(country.region);
    }
  });
  return regions;
}
export function RegionSelect() {
  const [selectedRegions, setSelectedRegions] =
    useRecoilState(filterRegionsState);
  const countries = useRecoilValueLoadable(countriesState);

  const regions = determineRegions(countries.contents);

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRegions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid item sx={{ maxWidth: 360, flex: 1, minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel color='secondary' id='region-label'>
          Region
        </InputLabel>
        <Select
          labelId='region-label'
          id='region-select'
          label='Region'
          color='secondary'
          multiple
          value={selectedRegions}
          renderValue={(selected) => selected.join(", ")}
          onChange={handleRegionChange}
        >
          {regions.map((r, i) => {
            return (
              <MenuItem value={r} key={i}>
                <Checkbox
                  color='secondary'
                  checked={selectedRegions.indexOf(r) > -1}
                />
                {r}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
}
