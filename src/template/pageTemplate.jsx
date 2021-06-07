import React from "react";

import { Grid } from "@material-ui/core";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";

const PageTemplate = () => {
  return (
    <Grid container direction="column">
      <header>
        <Header />
      </header>
      <main>
        <HeroSection />
      </main>
    </Grid>
  );
};

export default PageTemplate;
