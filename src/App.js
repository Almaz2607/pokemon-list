import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "./components/pokemonCard";

function App() {
  const pokeNames = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "metapod",
    "butterfree",
    "weedle",
  ];
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const [pokemons, setPokemons] = useState([]);
  const logRef = useRef(false);

  const getPokemons = async () => {
    const res = await fetch(url);
    const data = await res.json();

    const pokemonArray = [];
    for (const name of pokeNames) {
      data.results.forEach((item) => {
        if (item.name === name) pokemonArray.push(item);
      });
    }

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(pokemonArray);
  };

  useEffect(() => {
    if (logRef.current === false) {
      getPokemons();
      logRef.current = true;
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="app-container">
        <div className="column column-left">
          <div className="logo">
            <p className="logo__name">
              <i>GEEKS</i>
            </p>
            <img src="./image/logo.png" className="logo__image" alt="logo" />
          </div>
          <div className="pokemon-container">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
              />
            ))}
          </div>
        </div>
        <div className="column column-right">
          <h2 className="title">
            Сделать Pokemon лист с помощью CRA(create-react-app) или на Vite
            React:
          </h2>
          <ol className="task-list">
            <li>сверстать карточку покемонов</li>
            <li>сделать запрос на Pokemon API</li>
            <li>отобразить карточки на странице </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
