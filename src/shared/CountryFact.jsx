import { Typography } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";

export function CountryFact({ label, value, isNumber }) {
  var valueComp = isNumber ? (
    <NumberFormat value={value} displayType={"text"} thousandSeparator={true} />
  ) : (
    value
  );

  if (value) {
    return (
      <Typography>
        <b>{label}:</b> {valueComp}
      </Typography>
    );
  } else {
    return <></>;
  }
}
