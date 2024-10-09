"use client";

import React, { FC } from "react";
import scss from "./Search.module.scss";
import { useGetSearchResultQuery } from "@/redux/api/search";
import { useParams, useRouter } from "next/navigation";
import ItemCard from "./ItemCard";

interface SearchItem {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

const SearchResult: FC = () => {
  const { searchQuery } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useGetSearchResultQuery(`${searchQuery}`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading search results</p>;

  return (
    <section className={scss.SearchResult}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.explore}>
            <h2>Search Results for "{searchQuery}"</h2>
          </div>
          <div className={scss.list}>
            {data?.results.length ? (
              data.results.map((item: SearchItem) => (
                <div
                  key={item.id}
                  className={scss.movie}
                  onClick={() => router.push(`/${item.media_type}/${item.id}`)}
                >
                  <ItemCard
                    original_title={item.title || item.name}
                    poster_path={item.poster_path}
                    first_air_date={item.first_air_date}
                    release_date={item.release_date}
                    vote_average={item.vote_average}
                  />
                </div>
              ))
            ) : (
              <p>No results found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
