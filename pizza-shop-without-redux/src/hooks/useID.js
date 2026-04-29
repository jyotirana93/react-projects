import { useRef } from "react";

export const useID = () => {
  const storedID = JSON.parse(localStorage.getItem("pizzaID")) || 1;
  const nextId = useRef(storedID);
  const placedStartTime = Date.now();
  const pizzaStage = { stage: "order-placed" };

  const createPizzaID = (pizzaForm) => {
    const updatePizza = {
      id: `00${nextId.current++}`,
      ...pizzaForm,
      ...pizzaStage,
      placedStartTime,
    };

    localStorage.setItem("pizzaID", JSON.stringify(nextId.current));

    return updatePizza;
  };

  return { createPizzaID };
};
