import { atom, selector } from "recoil";
import { localStorageEffect } from "./localStorageEffect";
import { countriesState } from "./countries.state";


function countrySorter(c1, c2) {
  if (c1.name.common > c2.name.common) {
    return 1;
  } else if (c1.name.common < c2.name.common) {
    return -1;
  } else {
    return 0;
  }
}

export const favoriteCountriesState = atom({
  key: "favoriteCountriesState",
  default: [],
  effects: [localStorageEffect("favorites_storage")]
});

export const favoriteCountriesSelector = selector({
  key: "favoriteCountriesSelector",
  get: ({get }) => {
    const favoriteCountriesIds = get(favoriteCountriesState);
    if (favoriteCountriesIds.length > 0) {
      const countries = get(countriesState);
      var favorites = countries.filter(c => favoriteCountriesIds.includes(c.cca3));
      favorites.sort(countrySorter);
      return favorites;
    } else {
      return [];
    }
  }
})