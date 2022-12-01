import React from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/moviesData";
import "./Row.css";
import SpatialNavigation, { Focusable } from "react-js-spatial-navigation";

const Row = ({ title }) => {
  const navigate = useNavigate();

  console.log(process.env.REACT_APP_TIZEN_PKG, "PACKAGE");

  return (
    <div className="row">
      <SpatialNavigation>
        <Focusable>
          <h2 style={{ color: "white" }}>{title}</h2>
        </Focusable>
        {movies.map((movie) => (
          <div className="column">
            <Focusable
              onClickEnter={() => navigate("/movie", { state: movie })}
            >
              <img key={movie.sources} src={movie.thumb} alt={movie.name} />
            </Focusable>
          </div>
        ))}
      </SpatialNavigation>
    </div>
  );
};

export default Row;
