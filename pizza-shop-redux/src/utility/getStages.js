const getStages = (pizzaData, stage) => {
  return pizzaData.filter((pizza) => pizza.stage === stage);
};

export default getStages;
