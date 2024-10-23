import { FC } from "react";
import scss from "./Similar.module.scss";
import { useGetSimilarQuery } from "@/redux/api/similar";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ItemCard from "../homeSEction/ItemCard";
import { useKeenSlider } from "keen-slider/react";
import { useHeaderStore } from "@/stores/useHeaderSrote";

const Similar: FC = () => {
  const router = useRouter();
  const { movie_tv, id } = useParams();
  const {
    data: similar,
    isLoading,
    isError,
  } = useGetSimilarQuery({
    movie_tv: String(movie_tv),
    id: String(id),
  });
  const { isMobile } = useHeaderStore();

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: isMobile ? 2.8 : 5,
      spacing: 15,
    },
  });
  console.log("🚀 ~ similar", similar);
  return (
    <section className={scss.Similar}>
      <div className="container">
        <div className={scss.content}>
          <h1>Similar Movies</h1>
          <div className={scss.keenSlider}>
            {isLoading ? (
              <h1>loading...</h1>
            ) : (
              <div ref={ref} className="keen-slider">
                {similar?.results.map((item, index) => (
                  <div key={index} className="keen-slider__slide">
                    <div
                      className={scss.similar}
                      onClick={() => router.push(`/movie/${item.id}`)}
                    >
                      <ItemCard
                        original_title={item.title || item.name}
                        poster_path={item.poster_path}
                        first_air_date={
                          item.release_date || item.first_air_date
                        }
                        release_date={item.release_date}
                        vote_average={item.vote_average}
                      />
                    </div>
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

export default Similar;
