"use client";
import { useState } from "react";
import scss from "./Popular.module.scss";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetPopularQuery } from "@/redux/api/popular";

const Popular = () => {
  const [popular, setPopular] = useState("movie");
  const { data, isLoading } = useGetPopularQuery(popular);
  const router = useRouter();
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 5,
      spacing: 15,
    },
  });

  const getBorderColor = (percentage: number) => {
    if (percentage < 30) return "yellow"; // до 30%
    if (percentage >= 30 && percentage < 50) return "green"; // с 30 до 50
    if (percentage >= 50 && percentage < 70) return "orange"; // с 50 до 70
    return "red";
  };

  return (
    <div className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Popular</h1>
            <div className={scss.switcher}>
              <button
                onClick={() => setPopular("movie")}
                className={
                  popular === "movie"
                    ? `${scss.button} ${scss.active}`
                    : scss.button
                }
              >
                Movies
              </button>
              <button
                onClick={() => setPopular("tv")}
                className={
                  popular === "tv"
                    ? `${scss.button} ${scss.active}`
                    : scss.button
                }
              >
                TV Shows
              </button>
            </div>
          </div>
          <div className={scss.bottom}>
            <div className={scss.keenSlider}>
              {isLoading ? (
                <h1>Загрузка...</h1>
              ) : (
                <div ref={ref} className="keen-slider">
                  {data?.results.map((item, index) => {
                    const votePercentage = item.vote_average * 10;

                    return (
                      <div key={index} className="keen-slider__slide">
                        <div
                          className={scss.slider}
                          onClick={() => router.push(`/${popular}/${item.id}`)}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                            alt={item.title}
                          />
                          <div className={scss.reting}>
                            <CircularProgressbar
                              value={votePercentage}
                              text={`${item.vote_average.toFixed(1) || "N/A"}%`}
                              styles={buildStyles({
                                rotation: 0,
                                strokeLinecap: "butt",
                                textSize: "30px",

                                textColor: "black",
                                pathColor: getBorderColor(votePercentage),
                                trailColor: "#d6d6d6",
                                backgroundColor: "#fff",
                              })}
                            />
                          </div>
                          <div className={scss.text}>
                            <h2>{item.title || item.name}</h2>
                            <p>
                              {new Date(
                                item.release_date || item.first_air_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
