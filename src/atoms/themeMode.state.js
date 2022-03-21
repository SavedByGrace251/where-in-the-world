import { atom } from "recoil";
import { localStorageEffect } from "./localStorageEffect";

export const themeModeState = atom({
  key: "themeModeState",
  default: "light",
  effects: [localStorageEffect("themeModeState_storage")]
});