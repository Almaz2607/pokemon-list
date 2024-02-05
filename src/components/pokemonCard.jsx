import React from "react";

const PokemonCard = ({ name, image }) => {
  return (
    <div className="pokemon-item">
      <img className="pokemon-item__image" src={image} alt={name} />
      <p className="pokemon-item__name">{name}</p>
    </div>
  );
};

export default PokemonCard;
