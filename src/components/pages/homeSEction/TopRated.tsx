"use client";
import { useState } from "react";
import scss from "./TopRated.module.scss";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetTopRatedQuery } from "@/redux/api/topRated";
import { useHeaderStore } from "@/stores/useHeaderSrote";

const TopRated = () => {
  const [topRated, setTopRated] = useState("movie");
  const { data, isLoading } = useGetTopRatedQuery(topRated);
  const {isMobile} = useHeaderStore()
  const router = useRouter();
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: isMobile ? 2.8 : 5,
      spacing: 15,
    },
  });

  const getBorderColor = (percentage: number) => {
    if (percentage < 30) return "yellow";
    if (percentage >= 30 && percentage < 50) return "green";
    if (percentage >= 50 && percentage < 70) return "orange";
    return "red";
  };

  return (
    <div className={scss.TopRated}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>TopRated</h1>
            <div className={scss.switcher}>
              <button
                onClick={() => setTopRated("movie")}
                className={
                  topRated === "movie"
                    ? `${scss.button} ${scss.active}`
                    : scss.button
                }
              >
                Movies
              </button>
              <button
                onClick={() => setTopRated("tv")}
                className={
                  topRated === "tv"
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
                          onClick={() => router.push(`/${topRated}/${item.id}`)}
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

export default TopRated;
