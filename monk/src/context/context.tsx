import React, { Dispatch, createContext, useReducer } from "react";
import { ProductActions, productReducer } from "./reducers";
import { IProduct } from "../components/ProductTable";

export interface ProductsContextType {
  products: IProduct[];
  dispatch: Dispatch<ProductActions>;
}

const initialState = {
  products: [{ id: Date.now() }],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export type InitialStateType = {
  products: IProduct[];
};

const mainReducer = (
  { products }: InitialStateType,
  action: ProductActions
) => ({
  products: productReducer(products, action),
});
interface Props {
  children: React.ReactNode;
}
const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppProvider, AppContext };
