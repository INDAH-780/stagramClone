/*starting point of application*/

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./context/AuthContext";

import QueryProvider from "./lib/react-query/QueryProvider";

/*The exclamation mark (!) is optional and tells TypeScript (if you're using it) to be certain the element exists and won't be null.*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
