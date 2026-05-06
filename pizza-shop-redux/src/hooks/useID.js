import { useRef } from "react";
import { useSelector } from "react-redux";

export const useID = () => {
  const storedID = JSON.parse(localStorage.getItem("pizzaID")) || 1;
  const nextId = useRef(storedID);
  const placedStartTime = Date.now();
  const pizzaStage = { stage: "order-placed" };
  const pizzas = useSelector((state) => state.pizzas);
  console.log(pizzas.length);

  const createPizzaID = (pizzaForm) => {
    const updatePizza = {
      id: pizzas.length >= 9 ? `0${nextId.current++}` : `00${nextId.current++}`,
      ...pizzaForm,
      ...pizzaStage,
      placedStartTime,
    };

    localStorage.setItem("pizzaID", JSON.stringify(nextId.current));

    return updatePizza;
  };

  return { createPizzaID };
};
