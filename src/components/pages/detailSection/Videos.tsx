"use client";
import { useState } from "react";
import scss from "./Videos.module.scss";
import { useParams } from "next/navigation";
import { useGetVideosQuery } from "@/redux/api/videos";
import { useKeenSlider } from "keen-slider/react";
import { useHeaderStore } from "@/stores/useHeaderSrote";
import ReactPlayer from "react-player";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

const Videos = () => {
  const { videoKey, setVideoKey } = useHeaderStore();
  const { movie_tv, id } = useParams();
  const { data, isLoading, isError } = useGetVideosQuery({
    movie_tv: String(movie_tv),
    id: String(id),
  });

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: 5,
      spacing: 15,
    },
  });

  if (isLoading) return <div className={scss.loading}>Loading...</div>;
  if (isError) return <div className={scss.error}>Failed to load videos.</div>;

  return (
    <section className={scss.Videos}>
      <div className="container">
        <div className={scss.content}>
          <h1>Videos</h1>
          <div className={scss.keenSlider}>
            <div ref={ref} className="keen-slider">
              {data?.results.map(
                (item) =>
                  item.site === "YouTube" && ( // Render only YouTube videos
                    <div key={item.id} className={`keen-slider__slide`}>
                      <div
                        className={scss.videoItem}
                        onClick={() => setVideoKey(item.key)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                          alt=""
                        />
                        <div className={scss.span}>
                          <span>
                            <MdOutlineSlowMotionVideo />
                          </span>
                        </div>
                      </div>

                      <h5>{item.name}</h5>
                    </div>
                  )
              )}
            </div>
          </div>
          {videoKey ? (
            <div className={scss.modalVideo} onClick={() => setVideoKey("")}>
              <div className={scss.videoPlayer}>
                <ReactPlayer
                  controls
                  playing
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/embed/${videoKey}`}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Videos;
