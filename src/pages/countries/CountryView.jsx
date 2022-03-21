import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { countryBorderSelector } from "../../atoms/countries.state";
import { favoriteCountriesState } from "../../atoms/favorites.state";
import { CountryFact } from "../../shared/CountryFact";
import { DynamicBackButton } from "../../shared/DynamicBackButton";

export function CountryView({ country }) {
  const [favorites, setFavorites] = useRecoilState(favoriteCountriesState);
  const navigate = useNavigate();
  const borderingCountries = useRecoilValueLoadable(
    countryBorderSelector(country.borders)
  );

  const isFavorite = favorites.includes(country.cca3);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      let newFavs = [...favorites];
      newFavs.splice(newFavs.indexOf(country.cca3), 1);
      setFavorites(newFavs);
    } else {
      let newFavs = [...favorites, country.cca3];
      setFavorites(newFavs);
    }
  };

  const handleNavToCountryPage = (countryId) => (event) => {
    event.preventDefault();
    const mouseButton = event.button;
    switch (mouseButton) {
      case 1:
        window.open(window.location.origin + "/" + countryId);
        break;
      case 0:
        navigate("/" + countryId);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container direction='column' spacing={4} sx={{ p: 4 }}>
      <Grid item>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <DynamicBackButton />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={handleFavoriteToggle}
              startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            >
              Favorite
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item sx={{ maxWidth: 800, flex: 1, minWidth: 400 }}>
            <img
              alt={country.name.common + " flag"}
              style={{ width: "100%" }}
              src={country.flags.svg}
            />
          </Grid>
          <Grid item sx={{ flex: 0.8 }}>
            <Grid container direction='column' spacing={4}>
              <Grid item>
                <Typography variant='h4'>{country.name.official}</Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item sx={{ minWidth: 220, maxWidth: 500 }}>
                    <Stack>
                      <CountryFact
                        label='Common Name'
                        value={country.name.common}
                      />
                      <CountryFact
                        label='Native Name'
                        value={
                          country.name.nativeName
                            ? Object.keys(country.name.nativeName)
                                .map(
                                  (key) =>
                                    `${country.name.nativeName[key].common} (${key})`
                                )
                                .join(", ")
                            : undefined
                        }
                      />
                      <CountryFact
                        label='Population'
                        value={country.population}
                        isNumber
                      />
                      <CountryFact label='Region' value={country.region} />
                      <CountryFact
                        label='Sub Region'
                        value={country.subregion}
                      />
                      <CountryFact
                        label='Capital'
                        value={
                          country.capital.length > 1
                            ? country.capital.join(", ")
                            : country.capital
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item sx={{ minWidth: 220, maxWidth: 500 }}>
                    <Stack>
                      <CountryFact
                        label='Top Level Domains'
                        value={country.tld.join(", ")}
                      />
                      <CountryFact
                        label='Currencies'
                        value={
                          country.currencies
                            ? Object.keys(country.currencies)
                                .map(
                                  (key) =>
                                    `${country.currencies[key].name} (${country.currencies[key].symbol})`
                                )
                                .join(", ")
                            : undefined
                        }
                      />
                      <CountryFact
                        label='Languages'
                        value={
                          country.languages
                            ? Object.keys(country.languages)
                                .map((key) => country.languages[key])
                                .join(", ")
                            : undefined
                        }
                      />
                      <CountryFact
                        label='Is a UN Member'
                        value={country.unMember ? "True" : "False"}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              {borderingCountries.contents.length > 0 ? (
                <Grid item>
                  <Grid container alignItems='center' spacing={1}>
                    <Grid item>
                      <Typography sx={{ mr: 1 }}>
                        <b>Bordering Countries:</b>
                      </Typography>
                    </Grid>
                    {borderingCountries.contents.map((c, i) => (
                      <Grid item key={i}>
                        <Button
                          variant='contained'
                          onMouseDown={handleNavToCountryPage(c.cca3)}
                        >
                          {c.name.common}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ) : undefined}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
