export const getAllPizzas = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem("pizzaOrder")) || [];

  dispatch({ type: "GET_PIZZAS", payload: data });
};

export const moveToNextPizzaStage = (orderNumber) => (dispatch) => {
  const currentTime = Date.now();

  dispatch({ type: "NEXT_STAGE", payload: { orderNumber, currentTime } });
};

export const cancelPizza = (pizzaId) => {
  const currentTime = Date.now();
  return {
    type: "CANCEL_PIZZA",
    payload: {
      pizzaId,
      currentTime,
    },
  };
};
