import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { filterByRetailersDropdown } from "../../../config/filter.config";
import debounce from "lodash.debounce";
import { IconButton, Tooltip } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const GiftFilter = React.forwardRef(
  (
    {
      filterBy = "All",
      sortBy,
      handelFilterBy,
      handelSearchText,
      handelSortBy,
      handelOrderType,
    },
    ref
  ) => {
    const handelFilterByRetailer = (event) => {
      handelFilterBy(event.target.value);
    };
    const handelSearchInput = (event) => {
      handelSearchText(event.target.value);
    };
    const handelDebouncedSearch = React.useMemo((e) => {
      return debounce(handelSearchInput, 300);
    }, []);
    const handelSortByButton = (event) => {
      handelSortBy(event.target.value);
    };

    React.useEffect(() => {
      return () => handelDebouncedSearch?.cancel();
    });
    return (
      <Grid container spacing={4} className="my-2" alignContent="center">
        <Grid item xs={12} sm={4} md={4}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="filter-by-retailer">
              Filter By Retailer:{" "}
            </InputLabel>
            <Select
              color="primary"
              labelId="filter-by-retailer"
              id="filter-by-retailer"
              label="Filter By Retailer"
              value={filterBy}
              onChange={handelFilterByRetailer}
            >
              {filterByRetailersDropdown.map((filter) => (
                <MenuItem key={filter} value={filter}>
                  {filter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Search Box */}
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            fullWidth
            label="Search Here"
            placeholder="Search Gift cards"
            id="fullWidth"
            name="searchText"
            onChange={handelDebouncedSearch}
          />
        </Grid>
        {/* Sorting By */}
        <Grid item xs={12} md={4} sm={4} className="d-flex justify-content-end">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="sort-by">Sort By: </InputLabel>
            <Select
              labelId="sort-by"
              value={sortBy}
              id="sort-by"
              label="Age"
              onChange={handelSortByButton}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="points">Points</MenuItem>
              <MenuItem value="counts">Counts</MenuItem>
              {filterBy === "All" && (
                <MenuItem value="cardName">Names</MenuItem>
              )}
            </Select>
          </FormControl>
          {ref.current && (
            <>
              {ref.current === "asc" ? (
                <Tooltip title={"Ascending Order"}>
                  <IconButton
                    sx={{ margin: "10px 0" }}
                    onClick={() => handelOrderType("desc")}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={"Descending Order"}>
                  <IconButton
                    sx={{ margin: "10px 0" }}
                    onClick={() => handelOrderType("asc")}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Grid>
      </Grid>
    );
  }
);

GiftFilter.displayName = "GiftFilter";

export default GiftFilter;
