import { useEffect, useRef, useState } from "react";
import Card from "../../components/ui/card/Card";
import getStages from "../../utility/getStages";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPizzas,
  cancelPizza,
  removeAllPizzas,
} from "../../actions/pizzas.action";
import "./PizzaStagesSection.css";

const PizzaStagesSection = () => {
  const pizzas = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();
  const [deleteAllPizzas, setDeleteAllPizzas] = useState(false);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const intervalID = useRef(null);
  const orderPlacedStage = getStages(pizzas, "order-placed");
  const orderInMakingStage = getStages(pizzas, "order-in-making");
  const orderReadyStage = getStages(pizzas, "order-ready");
  const orderPickedStage = getStages(pizzas, "order-picked");
  const cancelledStage = getStages(pizzas, "cancelled");

  const hasActiveOrder = pizzas.some(
    (data) => data.stage !== "order-picked" && data.stage !== "cancelled",
  );
  const pickedOrder = pizzas.filter(
    (data) => data.stage === "order-picked",
  )?.length;
  const cancelledOrder = pizzas.filter(
    (data) => data.stage === "cancelled",
  )?.length;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);

  useEffect(() => {
    if (pizzas.length > 0) {
      localStorage.setItem("pizzaOrder", JSON.stringify(pizzas));
    }
  }, [pizzas]);

  useEffect(() => {
    if (!hasActiveOrder) {
      return;
    }

    if (pizzas.length > 0) {
      intervalID.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }

    return () => clearInterval(intervalID.current);
  }, [hasActiveOrder]);

  useEffect(() => {
    if (deleteAllPizzas && !hasActiveOrder) {
      localStorage.removeItem("pizzaOrder");
      localStorage.removeItem("pizzaID");
      clearInterval(intervalID.current);
    }
  }, [deleteAllPizzas]);

  const sortedDataOnTimeDelay = [...pizzas].sort((a, b) => {
    const timeA =
      (a?.pickedTime || a.cancelledTime || currentTime) - a?.placedStartTime;
    const timeB =
      (b?.pickedTime || b.cancelledTime || currentTime) - b?.placedStartTime;

    return timeB - timeA;
  });

  const cancelHandler = (pizzaID) => {
    dispatch(cancelPizza(pizzaID));
  };

  const clearAllPizzaHandler = () => {
    if (!hasActiveOrder) {
      setDeleteAllPizzas(true);
      dispatch(removeAllPizzas());
    }
  };

  return (
    <>
      <h3>Pizza Stages Section</h3>

      <section className="pizza-stages-section-main">
        <h3>Pizza Stages Section</h3>

        <div className="pizza-stages-section-container">
          <div>
            <h3>Order Placed</h3>
            {orderPlacedStage.map((pizza) => {
              const { pizza: pizzaName } = pizza;
              return (
                <Card
                  key={pizza.id}
                  orderPlacedTime={pizza.placedStartTime}
                  orderNumber={pizza.id}
                  size={pizza.size}
                  stage={pizza.stage}
                  cancelHandler={cancelHandler}
                  pizzaName={pizza.pizza}
                />
              );
            })}
          </div>

          <div>
            <h3>Order in making</h3>
            {orderInMakingStage.map((pizza) => {
              const { pizza: pizzaName } = pizza;
              return (
                <Card
                  key={pizza.id}
                  orderPlacedTime={pizza.placedStartTime}
                  makingStartTime={pizza.makingStartTime}
                  orderNumber={pizza.id}
                  size={pizza.size}
                  stage={pizza.stage}
                  cancelHandler={cancelHandler}
                  pizzaName={pizzaName}
                />
              );
            })}
          </div>

          <div>
            <h3>Order Ready</h3>
            {orderReadyStage.map((pizza) => {
              const { pizza: pizzaName } = pizza;
              return (
                <Card
                  key={pizza.id}
                  orderPlacedTime={pizza.placedStartTime}
                  readyStartTime={pizza.readyStartTime}
                  orderNumber={pizza.id}
                  size={pizza.size}
                  stage={pizza.stage}
                  cancelHandler={cancelHandler}
                  pizzaName={pizzaName}
                />
              );
            })}
          </div>

          <div>
            <h3>Order Picked</h3>
            {orderPickedStage.map((pizza) => {
              const { pizza: pizzaName } = pizza;
              return (
                <Card
                  key={pizza.id}
                  orderPlacedTime={pizza.placedStartTime}
                  orderNumber={pizza.id}
                  size={pizza.size}
                  stage={pizza.stage}
                  isPicked={pizza.picked}
                  pickedTime={pizza.pickedTime}
                  cancelHandler={cancelHandler}
                  pizzaName={pizzaName}
                />
              );
            })}
          </div>
          <div>
            <h3>Order Cancelled</h3>
            {cancelledStage.map((pizza) => {
              const { pizza: pizzaName } = pizza;
              return (
                <Card
                  key={pizza.id}
                  orderPlacedTime={pizza.placedStartTime}
                  orderNumber={pizza.id}
                  size={pizza.size}
                  stage={pizza.stage}
                  isPicked={pizza.picked}
                  pickedTime={pizza.pickedTime}
                  cancelHandler={cancelHandler}
                  pizzaName={pizzaName}
                />
              );
            })}
          </div>
        </div>

        {!pizzas.length ? (
          ""
        ) : (
          <>
            <h3>Main Section</h3>
            <div className="pizza-main-section-container">
              <table className="pizza-main-section-table">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Order ID</th>
                    <th>Stage</th>
                    <th>Total time spent(time from order place)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDataOnTimeDelay.map((data, i) => {
                    const stageLookUp = {
                      "order-placed": "Order Placed",
                      "order-in-making": "Order in Making",
                      "order-ready": "Order Ready",
                      "order-picked": "Order Picked",
                      cancelled: "Cancelled",
                    };
                    const endTime =
                      data?.pickedTime || data.cancelledTime || currentTime;

                    const totalTime = endTime - data?.placedStartTime;

                    const minutes = Math.floor(totalTime / 60000);
                    const seconds = Math.ceil((totalTime / 1000) % 60);
                    const isPizzaCancelled = data.stage === "cancelled";
                    const isPizzaPicked = data.stage === "order-picked";

                    return (
                      <tr
                        style={{
                          backgroundColor: isPizzaCancelled ? "#70696e" : "",
                          color: isPizzaCancelled ? "black" : "",
                        }}
                        key={data.id}
                      >
                        <td>{i + 1}</td>
                        <td>{data.id}</td>
                        <td>{stageLookUp[data.stage]}</td>
                        <td>
                          {minutes} min {seconds} sec
                        </td>
                        {data.stage === "order-placed" ||
                        data.stage === "order-in-making" ||
                        isPizzaCancelled ? (
                          <td>
                            <button
                              disabled={isPizzaCancelled}
                              onClick={() => cancelHandler(data.id)}
                            >
                              Cancel
                            </button>
                          </td>
                        ) : isPizzaPicked ? (
                          <td>
                            <span> ✅</span>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td> Total Order Picked</td>
                    <td colSpan={3}>
                      {pickedOrder >= 10
                        ? `0${pickedOrder}`
                        : pickedOrder
                          ? `00${pickedOrder}`
                          : "0"}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td> Total Order Cancelled</td>
                    <td colSpan={3}>
                      {cancelledOrder >= 10
                        ? `0${cancelledOrder}`
                        : cancelledOrder
                          ? `00${cancelledOrder}`
                          : "0"}
                    </td>
                    <td></td>
                  </tr>
                  {!hasActiveOrder ? (
                    <tr>
                      <td colSpan={5}>
                        <button
                          style={{
                            width: "150px",
                            height: "40px",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                          onClick={clearAllPizzaHandler}
                        >
                          Clear all pizzas
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tfoot>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default PizzaStagesSection;
