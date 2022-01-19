import React from "react";
import HomePage from "./pages/Home";
import StoreProvider from "./store/Provider";

export default function App() {
  return (
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  );
}
