import { useGetRecomendQuery } from "@/redux/api/recommendations";
import scss from "./Recommendation.module.scss";
import { useState } from "react";
import { useParams } from "next/navigation";

const Recommendation = () => {
  const { movie_tv, id } = useParams();
  const { data, isLoading, isError } = useGetRecomendQuery({
    movie_tv: String(movie_tv),
    id: String(id),
  });
  //   console.log("🚀 ~ Recommendation ~ data:", data);
  return (
    <section className={scss.Recommendation}>
      <div className="container">
        <div className={scss.content}>Recommendation</div>
      </div>
    </section>
  );
};

export default Recommendation;
