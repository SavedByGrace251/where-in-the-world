import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { filterSearchState } from "../../../atoms/filter.state";

export function SearchBox() {
  const [searchText, setSearchText] = useRecoilState(filterSearchState);

  return (
    <Grid item sx={{ maxWidth: 300, flex: 1, minWidth: 120 }}>
      <TextField
        variant='outlined'
        label='Search'
        color='secondary'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color='inherit' />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}
