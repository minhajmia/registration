import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import { Toaster } from "react-hot-toast";

const App = ({ children }) => {
  return (
    <div>
      <RouterProvider router={router}>{children}</RouterProvider>
      <Toaster />
    </div>
  );
};

export default App;
