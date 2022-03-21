import { atom } from "recoil";

export const filterSearchState = atom({
  key: "filterSearchState",
  default: ""
});
export const filterRegionsState = atom({
  key: "filterRegionsState",
  default: []
});
export const filterSubregionsState = atom({
  key: "filterSubregionsState",
  default: []
});