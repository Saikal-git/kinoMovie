"use client";
import React from "react";
import Details from "./detailSection/Details";
import Actors from "./detailSection/Actors";
import Recommendation from "./detailSection/Recommendation";
import Videos from "./detailSection/Videos";
import Similar from "./detailSection/Similar";

const DetailPage = () => {
  return (
    <>
      <Details />
      <Actors />
      <Videos />
      <Recommendation />
      <Similar />
    </>
  );
};

export default DetailPage;
