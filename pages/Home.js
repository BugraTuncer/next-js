import React from "react";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff ",
};

const Home = ({ jsonParsedPokemon }) => {
  return (
    <React.Fragment>
      <h1 className={utilStyles.header}> Pokemon API</h1>
      <div className={utilStyles.container}>
        {jsonParsedPokemon?.map((data) => {
          return (
            <Link
              href={{
                pathname: `pokemon/${data.id}`,
                query: {
                  color: colors[data.types[0].type.name],
                },
              }}
              key={data.id}
            >
              <div
                className={utilStyles.card}
                key={data.id}
                style={{ backgroundColor: colors[data.types[0].type.name] }}
              >
                <img
                  className={utilStyles.img}
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
                    .toString()
                    .padStart(3, "0")}.png`}
                  alt={data.name}
                />
                <p className={utilStyles.name}>${data.name}</p>
                <p className={utilStyles.id}>
                  #${data.id.toString().padStart(3, "0")}
                </p>
                <p className={utilStyles.weight}>${data.weight} Kg</p>
                <div className={utilStyles.typeBlock}>
                  <p>Tip : </p>{" "}
                  <p className={utilStyles.type}>
                    {" "}
                    &nbsp;{data.types[0].type.name}
                  </p>{" "}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
