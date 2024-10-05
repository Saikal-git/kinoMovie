"use client";
import { FC } from "react";
import scss from "./Actors.module.scss";
import { useGetCreditsQuery } from "@/redux/api/actors";
import { useParams } from "next/navigation";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Actors: FC = () => {
  const { movie_tv, id } = useParams();
  const { data, isLoading, isError } = useGetCreditsQuery({
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
  if (isError) return <div className={scss.error}>Failed to load data.</div>;

  return (
    <section className={scss.Actors}>
      <div className="container">
        <div className={scss.content}>
          <h1>Actors</h1>
          <div className={scss.keenSlider}>
            {isLoading ? (
              <h1>Загрузка...</h1>
            ) : (
              <div ref={ref} className="keen-slider">
                {data?.cast.map((item) => (
                  <div key={item.id} className={`keen-slider__slide`}>
                    <div className={scss.cast}>
                      {item?.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                          alt={item.name}
                          className={scss.actorImage}
                        />
                      ) : (
                        <img
                          src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"
                          alt={item.name}
                          className={scss.actorImage}
                        />
                      )}
                    </div>
                    <h2>{item.name}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actors;
