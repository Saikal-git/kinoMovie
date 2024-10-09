"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import scss from "./Movie.module.scss";
import { useGetMovieQuery } from "@/redux/api/movie";
import ItemCard from "../homeSEction/ItemCard";
import { MultiValue } from "react-select";
import Select from "react-select";
import { genresMovie } from "@/constants/genres";
import { sortOptions } from "@/constants/sortBy";

interface Genre {
  value: number;
  label: string;
}

const Movie: FC = () => {
  const router = useRouter();
  const [searchGenres, setSearchGenres] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("");
  const { data: movieData, refetch } = useGetMovieQuery({
    genre: searchGenres.join(","),
    sort: sort,
  });

  const selectGenres = (genres: any) => {
    if (genres) {
      setSearchGenres(genres.map((el: any) => el.value));
    } else {
      setSearchGenres([]);
    }
  };

  const sortContent = (value: any) => {
    if (value) {
      setSort(value.value);
      refetch();
    } else {
      setSort("");
    }
  };

  return (
    <section className={scss.Movie}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.top}>
            <h1>Explore Movies</h1>
          </div>
          <div className={scss.sort}>
            <div className={scss.select}>
              <Select
                defaultValue={searchGenres}
                placeholder="Select genres"
                isMulti
                name="genres"
                options={genresMovie}
                defaultInputValue=""
                onChange={selectGenres}
              />
            </div>
            <div className={scss.select}>
              <Select
                placeholder="Sort by"
                name="sort"
                options={sortOptions}
                defaultInputValue=""
                onChange={sortContent}
              />
            </div>
          </div>

          <div className={scss.bottom}>
            {movieData?.results?.map((item) => (
              <div
                key={item.id}
                className={scss.movie}
                onClick={() => router.push(`/movie/${item.id}`)}
              >
                <ItemCard
                  original_title={item.title}
                  poster_path={item.poster_path}
                  first_air_date={item.release_date}
                  release_date={item.release_date}
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

export default Movie;
