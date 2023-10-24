import HomeAbout from "./about/HomeAbout";
import Category from "./category/Category";
import Header from "./header/Header";
import Slider from "./slider/Slider";

const Home = () => { const top = () => {
  window.scrollTo(0, 0);
};
  return (
    <>
    {top()}
      <Slider />
      <Header />
      <Category />
      <HomeAbout />
    </>
  );
};

export default Home;
