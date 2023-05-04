import { InputBase, styled } from "@mui/material";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";
import React from "react";
const Search = styled("div")({
  position: "relative",
  border: "1px solid #00000012",
  paddingLeft: "19px",
  margin: "8.5px 28px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  gap: "13px",
});

export default function SearchField() {
  return (
    <Search>
      <SearchIcon />

      <InputBase
        autoFocus
        placeholder="Search product"
        inputProps={{ "aria-label": "search" }}
        sx={{ fontSize: "14px" }}
      />
    </Search>
  );
}
