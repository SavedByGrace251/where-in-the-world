import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Sorter() {
  return (
    <FormControl sx={{ maxWidth: 360, width: "100%", minWidth: 240 }}>
      <InputLabel id='demo-simple-select-label'>Region</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        // value={age}
        label='Age'
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
