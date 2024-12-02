import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

const CardBlogItem = ({ image, title, description }) => {
  return (
    <div className="flex flex-col bg-cinderella-50">
      <div className="relative w-full h-[250px]">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-8">
        <h2 className="font-bold mb-3 line-clamp-2">{title}</h2>
        <p className="mb-5 line-clamp-3">{description}</p>
        <div className="flex justify-end">
          <NavLink
            to="/blog/detail"
            className="px-5 py-2 bg-night-shadz-700 text-white-50"
          >
            Selengkapnya
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const CardBlog = ({
  title,
  description,
  articles,
  bgJon,
  bgNightShadz,
  bgScorpio,
}) => {
  return (
    <div
      className={classNames("flex flex-col xl:flex-row rounded-l-3xl", {
        "bg-jon-950": bgJon,
        "bg-night-shadz-700": bgNightShadz,
        "bg-scorpion-700": bgScorpio,
      })}
    >
      <div className="w-full xl:w-4/12 text-cinderella-100 p-8">
        <h1 className="text-6xl mb-5 font-semibold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div className="w-full xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-white-50">
        {articles.map((article, idx) => (
          <CardBlogItem
            key={idx}
            image={article.image}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CardBlog;
