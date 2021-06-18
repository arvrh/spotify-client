//@ts-nocheck
// TODO: fix router typing
import React from "react";
import { useState } from "../overmind";

const Album = () => {
  const {
    router: { id },
  } = useState();
  return (
    <div>
      <h1>Album</h1>
      <h2>id: {id}</h2>
    </div>
  );
};

export default Album;
