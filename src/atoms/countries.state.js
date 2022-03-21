import { atom, selector, selectorFamily } from "recoil";

export const countriesState = atom({
  key: "countries",
  default: selector({
    key: "countries-loader",
    get: async() => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      return response.json();
    }
  })
})

export const countrySelector = selectorFamily({
  key: "countrySelector",
  get: (countryCode) => ({get }) => {
    const countries = get(countriesState);
    const country = countries.find(c => c.cca3 === countryCode);
    return country;
  }
})


export const countryBorderSelector = selectorFamily({
  key: "countrySelector",
  get: (borderCountryIds) => ({get }) => {
    if (borderCountryIds) {
      const countries = get(countriesState);
      const borders = countries.filter(c => borderCountryIds.includes(c.cca3));
      return borders;
    } else {
      return [];
    }
  }
})