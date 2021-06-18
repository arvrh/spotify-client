import React from "react";
import { useState } from "./overmind";
import Pages from "./pages";
import { Page } from "./overmind/namespaces/router/state";

const App = () => {
  const {
    router: { currentPage },
  } = useState();
  const renderSwitch = (current: Page) => {
    switch (current) {
      case Page.Home:
        return <Pages.Home />;
      case Page.Artist:
        return <Pages.Artist />;
      case Page.Album:
        return <Pages.Album />;
    }
  };
  return <div>{renderSwitch(currentPage)}</div>;
};
export default App;
