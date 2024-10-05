"use client";
import { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import Typed from "typed.js";
import Image from "next/image";
import { useGetUpcomingQuery } from "@/redux/api/upcoming";

const Welcome = () => {
  const { data } = useGetUpcomingQuery();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // console.log("🚀 ~ Welcome ~ backgroundImage:", backgroundImage);
  useEffect(() => {
    const typed = new Typed(".multiple-text", {
      strings: [
        "Get Ready for Cinematic Bliss",
        "Welcome to EcoMovie - Enjoy the Show!",
        "Discover Movie Magic at EcoMovie",
      ],
      typeSpeed: 50,
      backSpeed: 10,
      backDelay: 1200,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    backgroundRandomImage();
  }, [data]);

  const backgroundRandomImage = () => {
    if (data?.results) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropImage = data.results[randomIndex].backdrop_path;
      setBackgroundImage(`https://image.tmdb.org/t/p/original${backdropImage}`);
    }
  };

  return (
    <section className={scss.Welcome}>
      {isLoading && <span className={scss.loader}></span>}

      {backgroundImage && (
        <div className={scss.bgImageContainer}>
          <Image
            className={scss.bgImage}
            src={backgroundImage}
            alt="movieImage"
            width={1920}
            height={700}
            priority
            loading="eager"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      )}
      <div className="container">
        <div className={scss.content}>
          <div className={scss.welcomeText}>
            <h1>
              <span className="multiple-text"></span>
            </h1>
            <h4>
              Millions of movies, TV shows and people to discover. Explore now.
            </h4>
            <div className={scss.search_movie}>
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
