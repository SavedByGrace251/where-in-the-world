import { Box, Grid } from "@mui/material";
import { CountryCard } from "./CountryCard";
import { AutoSizer, List } from "react-virtualized";

export function CountryCards({ countries }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const cardSpaceWidth = 360;
        const cardSpaceheight = 420;
        const itemsPerRow = Math.floor(width / cardSpaceWidth);
        const rowCount = Math.ceil(countries.length / itemsPerRow);

        return (
          <List
            className='List'
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={cardSpaceheight}
            rowRenderer={({ index, key, style }) => {
              const items = [];
              const fromIndex = index * itemsPerRow;
              const toIndex = Math.min(
                fromIndex + itemsPerRow,
                countries.length
              );

              for (let i = fromIndex; i < toIndex; i++) {
                items.push(
                  <Grid className='Item' key={i}>
                    <CountryCard country={countries[i]} />
                  </Grid>
                );
              }

              return (
                <Box
                  className='Row'
                  key={key}
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: `repeat(${itemsPerRow}, minmax(${cardSpaceWidth}px, 1fr))`,
                  }}
                  style={style}
                >
                  {items}
                </Box>
              );
            }}
          />
        );
      }}
    </AutoSizer>
  );
}
