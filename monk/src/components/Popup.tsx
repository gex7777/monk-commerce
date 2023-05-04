import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import SearchField from "./SearchField";
import { useAsync } from "react-async-hook";
interface Props {
  open: boolean;
  setOpen: (s: boolean) => void;
}
const fetchProducts = async (query: string) =>
  (
    await fetch(
      `https://stageapibc.monkcommerce.app/admin/shop/product?search=${query}&page=1`
    )
  ).json();

export default function FormDialog({ open, setOpen }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const asyncProducts = useAsync(fetchProducts, [searchQuery]);
  console.log(asyncProducts.result);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Select Products
      </BootstrapDialogTitle>
      <DialogContent
        sx={{ borderBottom: "0px", p: 0, minHeight: "49px" }}
        dividers
      >
        <SearchField setSearchQuery={(q: string) => setSearchQuery(q)} />
      </DialogContent>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Cras matti Cras mattis consectetur purus sit amet fermentum. Cras
          justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Cras mattis
          consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
          facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
          ac, vestibulum at eros. Cras mattis consectetur purus sit amet
          fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit
          amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
          quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Cras matti
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
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
