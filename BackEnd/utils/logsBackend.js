const logsPeticiones = (json, infoApi) => {
  console.log(`----------------------------------------------------${infoApi}`);
  console.log(json);
  console.log(`----------------------------------------------------${infoApi}`);
};

module.exports = { logsPeticiones };
