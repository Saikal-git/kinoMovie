import Popular from "./homeSEction/Popular";
import TopRated from "./homeSEction/TopRated";
import Tranding from "./homeSEction/Tranding";
import Welcome from "./homeSEction/Welcome";

const HomePage = () => {
  return (
    <>
      <Welcome />
      <Tranding />
      <Popular />
      <TopRated />
    </>
  );
};

export default HomePage;
