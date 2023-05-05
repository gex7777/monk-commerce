import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import SearchField from "./SearchField";
import StyledButton from "./StyledButton";
import { useSearchProducts } from "../hooks/useFetchProducts";
import TreeList from "./TreeList";
interface Props {
  open: boolean;
  setOpen: (s: boolean) => void;
}

export default function FormDialog({ open, setOpen }: Props) {
  const { inputText, setInputText, search } = useSearchProducts();

  const handleClose = () => {
    setOpen(false);
  };
  console.log(search);
  return (
    <Dialog
      scroll={"paper"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "663px",
            // Set your width here
          },
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Select Products
      </BootstrapDialogTitle>
      <DialogContent
        sx={{ borderBottom: "0px", p: 0, minHeight: "50px" }}
        dividers
      >
        <SearchField setSearchQuery={(q: string) => setInputText(q)} />
      </DialogContent>
      <DialogContent sx={{ p: 0, m: 0, height: "612px" }} dividers>
        {search.loading && (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!!search.result && <TreeList products={search.result} />}
      </DialogContent>
      <DialogActions>
        <StyledButton text="Add" />
      </DialogActions>
    </Dialog>
  );
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        px: "28px",
        py: "11.5px",
        maxHeight: "50px",
        fontWeight: 600,
        fontSize: "18px",
        justifyContent: "space-between",
        display: "flex",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
