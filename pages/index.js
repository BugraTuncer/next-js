import React from "react";
import HomeComp from "./Home";

export async function getServerSideProps() {
  let jsonParsedPokemon = [];
  const url = "https://pokeapi.co/api/v2/pokemon/";
  for (let i = 1; i < 20; i++) {
    const pokemon = await fetch(url + i);
    jsonParsedPokemon.push(await pokemon.json());
  }
  return {
    props: {
      jsonParsedPokemon,
    },
  };
}

export default function Home({ jsonParsedPokemon }) {
  return <HomeComp jsonParsedPokemon={jsonParsedPokemon} />;
}
