import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps({ params }) {
  const id = params.id;
  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonDetail = await request.json();
  return {
    props: {
      data: pokemonDetail,
    },
  };
}

export default function Post({ data }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (loading) {
      router.push("/");
    }
  }, [loading]);

  return (
    <>
      <Head>
        <title>{data.name.toUpperCase()}</title>
      </Head>
      {loading ? (
        <h1
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "100vh",
          }}
        >
          Redirecting...
        </h1>
      ) : (
        <>
          {" "}
          <div
            style={{
              background: router.query.color,
            }}
          >
            <button
              onClick={() => {
                setLoading(true);
              }}
              style={{ width: "100px", fontWeight: "bolder" }}
            >
              Back
            </button>
            <img
              className={utilStyles.img}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id
                .toString()
                .padStart(3, "0")}.png`}
              alt={data.name}
            />
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <p>Name : {data.name.toUpperCase()}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <ul title="Abilities">
                <h3>Abilities</h3>
                {data.abilities.map((ability, index) => {
                  return (
                    <li key={`index${index}`}>
                      <p>{ability.ability.name}</p>
                    </li>
                  );
                })}
              </ul>
              <ul title="Types">
                <h3>Types</h3>
                {data.types.map((type, index) => {
                  return (
                    <li key={`index${index}`}>
                      <p>{type.type.name}</p>
                    </li>
                  );
                })}
              </ul>
              <ul title="Abilities">
                <h3>Stats</h3>
                {data.stats.map((stat, index) => {
                  return (
                    <li key={`index${index}`}>
                      <p>
                        {stat.stat.name} : {stat.base_stat}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
