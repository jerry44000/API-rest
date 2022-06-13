exports.success = (message, data) => {
  return { message, data };
};

//Attribution de l'ID unique
exports.getSoloId = (pokemons) => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const soloId = maxId + 1;

  return soloId;
};
