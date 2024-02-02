import React, { Suspense, useMemo, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

const Router = () => {
  const location = useLocation();
  const [pageState, setPageState] = useState<null | "404" | "error">(null);
  let path = location.pathname;
  const Component: any = useMemo(() => {
    if (["/"].includes(path)) {
      path = path + "home";
    }
    return React.lazy(() =>
      import(`./pages/${path.substring(1)}`).catch((err: any) => {
        setPageState(
          err.toString().includes("Cannot find module") ? "404" : "error"
        );
      })
    );
  }, [path]);
  let pageComponent = () => {
    if (pageState) {
      return <div>{pageState}</div>;
    }
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Component></Component>
      </Suspense>
    );
  };

  return pageComponent();
};

export const App = () => {
  return (
    <BrowserRouter basename={__PATH__}>
      <Router></Router>
    </BrowserRouter>
  );
};
