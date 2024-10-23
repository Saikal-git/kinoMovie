"use client";
import { useGetDetailsQuery } from "@/redux/api/details";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import scss from "./Details.module.scss";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useHeaderStore } from "@/stores/useHeaderSrote";
import { useGetVideosQuery } from "@/redux/api/videos";

const Details = () => {
  const { videoKey, setVideoKey } = useHeaderStore();
  const { movie_tv, id } = useParams();
  const { data, isLoading, isError } = useGetDetailsQuery({
    movie_tv: String(movie_tv),
    id: String(id),
  });
  console.log("🚀 ~ Details ~ data:", data);

  const { data: videos } = useGetVideosQuery({
    movie_tv: String(movie_tv),
    id: String(id),
  });

  if (isLoading) return <div className={scss.loader}>Loading...</div>;
  if (isError) return <div className={scss.error}>Failed to load data.</div>;
  if (!data) {
    return <div>No data available</div>;
  }

  const percentage = data.vote_average * 10;

  const getPathColor = (percentage: number) => {
    if (percentage <= 30) return "yellow";
    if (percentage > 30 && percentage <= 50) return "green";
    if (percentage > 50 && percentage <= 70) return "orange";
    return "red";
  };

  const handlePlayClick = () => {
    // console.log("Play trailer clicked!");
  };

  return (
    <section className={scss.Details}>
      <div className={scss.background}>
        {isLoading && <span className={scss.loader}></span>}
        <Image
          className={scss.bgImage}
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt="movieImage"
          width={1920}
          height={700}
          priority
          loading="eager"
        />
      </div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt=""
            />
          </div>
          <div className={scss.right}>
            <div className={scss.block}>
              <div className={scss.text}>
                <p>{data?.title || data?.name}</p>
                <p>
                  {data?.release_date ? data?.release_date?.slice(0, 4) : null}
                </p>
              </div>

              <div className={scss.block1}>
                <p>
                  <i>{data?.tagline}</i>
                </p>

                <div className={scss.drama}>
                  {data?.genres?.map((genre) => (
                    <button key={genre.id}>{genre.name}</button>
                  ))}
                </div>
                <div className={scss.rating}>
                  <div className={scss.progressCircle}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage.toFixed(1)}%`}
                      styles={buildStyles({
                        textColor: "black",
                        rotation: 25,
                        pathColor: getPathColor(percentage),
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                  <div
                    className={scss.playbtn}
                    onClick={() => setVideoKey(videos?.results[0].key!)}
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="65px"
                      height="65px"
                      viewBox="0 0 213.7 213.7"
                      xmlSpace="preserve"
                    >
                      <polygon
                        className={scss.triangle}
                        fill="none"
                        stroke="white"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="73.5,62.5 148.5,105.8 73.5,149.1"
                      ></polygon>
                      <circle
                        className={scss.circle}
                        fill="none"
                        stroke="white"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        cx="106.8"
                        cy="106.8"
                        r="103.3"
                      ></circle>
                    </svg>
                    <span className={scss.text}>Watch Trailer</span>
                  </div>
                </div>

                <div className={scss.overview}>
                  <p className={scss.p}>Overview</p>
                  <p>{data?.overview}</p>
                </div>
                <div className={scss.status}>
                  <h3>
                    Status: <span>{data?.status || "N/A"}</span>
                  </h3>

                  <h3>
                    Release Date:
                    <p>
                      {data?.release_date
                        ? new Date(data.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )
                        : "No Date Available"}
                    </p>
                  </h3>

                  <h3>
                    Runtime:{" "}
                    <p>
                      {data?.runtime !== undefined && data?.runtime !== null ? (
                        <>
                          {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                        </>
                      ) : (
                        "Runtime not available"
                      )}
                    </p>
                  </h3>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
