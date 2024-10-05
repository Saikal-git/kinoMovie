import { useState } from "react";
import scss from "./Videos.module.scss";
import { useParams } from "next/navigation";
import { useGetVideosQuery } from "@/redux/api/videos";
import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

const Videos = () => {
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
                      <div className={scss.videoItem}>
                        {/* <iframe
                          src={`https://www.youtube.com/embed/${item.key}`}
                          title={item.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className={scss.iframe} // Класс для стилей
                        ></iframe> */}
                        <img
                          src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                          alt=""
                        />
                      </div>
                      <h5>{item.name}</h5>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
