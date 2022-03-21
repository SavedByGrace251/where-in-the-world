import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { favoriteCountriesState } from "../atoms/favorites.state";
import { CountryFact } from "./CountryFact";

export function CountryCard({ country }) {
  const [favorites, setFavorites] = useRecoilState(favoriteCountriesState);
  const navigate = useNavigate();

  const isFavorite = favorites.includes(country.cca3);

  const handleNavToCountryPage = (e) => {
    e.preventDefault();
    const mouseButton = e.button;
    switch (mouseButton) {
      case 1:
        window.open(window.location.origin + "/" + country.cca3);
        break;
      case 0:
        navigate("/" + country.cca3);
        break;
      default:
        break;
    }
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      let newFavs = [...favorites];
      newFavs.splice(newFavs.indexOf(country.cca3), 1);
      setFavorites(newFavs);
    } else {
      let newFavs = [...favorites, country.cca3];
      setFavorites(newFavs);
    }
  };

  return (
    <Grid
      container
      direction='column'
      flexWrap='nowrap'
      justifyContent='center'
      alignItems='center'
    >
      <Card
        sx={{ width: 320, cursor: "pointer" }}
        onMouseDown={handleNavToCountryPage}
      >
        <CardMedia component='img' height='200' src={country.flags.png} />
        <CardContent sx={{ height: 160 }}>
          <Grid
            sx={{ width: "100%" }}
            container
            alignItems='center'
            flexWrap='nowrap'
          >
            <Grid item sx={{ flex: 1 }}>
              <Typography variant='h6'>{country.name.common}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label='favorite'
                size='large'
                onMouseDown={handleFavoriteToggle}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Grid>
          </Grid>
          <Stack>
            <CountryFact
              label='Population'
              value={country.population}
              isNumber
            />
            <CountryFact label='Region' value={country.region} />
            <CountryFact label='Sub Region' value={country.subregion} />
            <CountryFact label='Capital' value={country.capital} />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
