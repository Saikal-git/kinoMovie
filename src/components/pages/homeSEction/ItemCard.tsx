import React, { FC } from "react";
import scss from "./ItemCard.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster from "../../../assets/no-poster.png";
import Image from "next/image";

interface IItemProps {
  name?: string;
  original_title?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  vote_average?: number;
}

const getBorderColor = (percentage: number) => {
  if (percentage < 30) return "yellow"; // до 30%
  if (percentage >= 30 && percentage < 50) return "green"; // с 30 до 50
  if (percentage >= 50 && percentage < 70) return "orange"; // с 50 до 70
  return "red";
};

const ItemCard: FC<IItemProps> = ({
  first_air_date,
  name,
  original_title,
  poster_path,
  release_date,
  vote_average,
}) => {
  const votePercentage = vote_average ? vote_average * 10 : 0; // Проверка наличия vote_average

  return (
    <div className={scss.ItemCard}>
      <div className={scss.image}>
        {poster_path ? (
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/original${poster_path}`
                : `${poster}`
            }
            alt="poster"
          />
        ) : (
          <Image width={500} height={600} src={poster} alt="poster" />
        )}
      </div>
      <div className={scss.rating}>
        <CircularProgressbar
          value={votePercentage}
          text={`${vote_average?.toFixed(1) || "N/A"}%`}
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
      <div className={scss.title_date}>
        <h4 className={scss.title}>{original_title || name}</h4>
        <span className={scss.date}>
          {release_date || first_air_date || ""}
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
