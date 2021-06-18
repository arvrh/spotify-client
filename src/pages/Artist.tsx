import React from "react";
import { useState } from "../overmind";

const Artist = () => {
  const {
    router: { id },
  } = useState();
  return (
    <div>
      <h1>Artist</h1>
      <h2>id: {id}</h2>
    </div>
  );
};

export default Artist;
