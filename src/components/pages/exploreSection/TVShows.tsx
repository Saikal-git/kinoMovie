"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import scss from "./TVShows.module.scss";
import GenreSelect from "./GenreSelect";
import { MultiValue } from "react-select";
import { useGetTvShowsQuery } from "@/redux/api/tvShows";
import ItemCard from "../homeSEction/ItemCard";

interface Genre {
  value: number;
  label: string;
}

const TVShows: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<MultiValue<Genre>>([]);
  const [searchGenres, setSearchGenres] = useState("");
  const { data: tvData, refetch } = useGetTvShowsQuery(searchGenres);
  console.log("🚀 ~ tvData:", tvData)

  useEffect(() => {
    // Получение значений жанров из выбранных опций
    const sorted = value.map((item: any) => item.value);
    const searchValue = sorted.length > 0 ? sorted.join(",") : "";
    setSearchGenres(searchValue);
  }, [value]);

  useEffect(() => {
    refetch();
  }, [searchGenres, refetch]);

  return (
    <section className={scss.TVShows}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Explore TV Shows</h1>
            {/* Компонент для выбора жанров */}
            <GenreSelect setValue={setValue} />
          </div>

          <div className={scss.bottom}>
            {tvData?.results?.map((item) => (
              <div
                key={item.id}
                className={scss.TVShows}
                onClick={() => router.push(`/tv/${item.id}`)}
              >
               <ItemCard
                  original_title={item.name} // Используем "name" для сериалов
                  poster_path={item.poster_path}
                  first_air_date={item.first_air_date} // Используем "first_air_date"
                  vote_average={item.vote_average}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TVShows;
