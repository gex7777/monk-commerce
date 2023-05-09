import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import SearchField from "./SearchField";
import StyledButton from "./StyledButton";

import TreeList from "./TreeList";
import { useState } from "react";
import { Product } from "../ulits/interfaces";
import { AppContext } from "../context/context";
import { Types } from "../context/reducers";
import useProductSearch from "./../hooks/useProductSearch";
interface Props {
  open: boolean;
  setOpen: (s: boolean) => void;
  id: number;
  index: number;
}

export default function FormDialog({ open, setOpen, id, index }: Props) {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { products, hasMore, loading } = useProductSearch(query, pageNumber);

  const { dispatch } = React.useContext(AppContext);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const handleClose = () => {
    setOpen(false);
  };

  function handleSearch(e: string) {
    setQuery(e);
    setPageNumber(1);
  }

  const handleAddProducts = async () => {
    console.log("from ad products", selectedProducts, index);

    selectedProducts.forEach(async (product, idx) => {
      if (idx === 0)
        dispatch({
          type: Types.AddProduct,
          payload: {
            product: product,
            id: id,
          },
        });
      else
        dispatch({
          type: Types.CreateAfterID,
          payload: {
            idx: index,
            product: { id: Date.now() + idx, productDetails: product },
          },
        });
    });
    handleClose();
  };
  console.log(products);
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
        <SearchField setSearchQuery={handleSearch} />
      </DialogContent>
      <DialogContent sx={{ p: 0, m: 0, height: "612px" }} dividers>
        {loading && (
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

        {!!products && (
          <TreeList
            loading={loading}
            setPageNumber={() => setPageNumber((prev) => prev + 1)}
            hasMore={hasMore}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            products={products}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: "22.5px" }}>
        <Box sx={{ flex: 1 }}>
          {selectedProducts.length} product
          {selectedProducts.length > 1 ? `s` : null} selected
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          <StyledButton
            text="Cancel"
            variant="outlined"
            color="info"
            onClick={handleClose}
          />
          <StyledButton
            text="Add"
            variant="contained"
            onClick={handleAddProducts}
            disabled={selectedProducts.length < 1}
          />
        </Box>
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
