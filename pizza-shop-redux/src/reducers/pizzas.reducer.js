export const pizzasReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PIZZAS": {
      return action.payload;
    }

    case "NEXT_STAGE": {
      return state.map((pizza) => {
        if (
          pizza.id === action.payload.orderNumber &&
          pizza.stage === "order-placed"
        ) {
          return {
            ...pizza,
            stage: "order-in-making",
            makingStartTime: action.payload.currentTime,
          };
        }
        if (
          pizza.id === action.payload.orderNumber &&
          pizza.stage === "order-in-making"
        ) {
          return {
            ...pizza,
            stage: "order-ready",
            readyStartTime: action.payload.currentTime,
          };
        }
        if (
          pizza.id === action.payload.orderNumber &&
          pizza.stage === "order-ready"
        ) {
          return {
            ...pizza,
            stage: "order-picked",
            picked: true,
            pickedTime: action.payload.currentTime,
          };
        }

        return pizza;
      });
    }

    case "CANCEL_PIZZA": {
      return state.map((pizza) => {
        if (pizza.id === action.payload.pizzaId) {
          return {
            ...pizza,
            stage: "cancelled",
            cancelledTime: action.payload.currentTime,
          };
        }
        return pizza;
      });
    }

    default:
      return state;
  }
};
