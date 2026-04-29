import { useEffect, useRef, useState } from "react";
import Card from "../../ui/card/Card";
import getStages from "../../utility/getStages";

import "./PizzaStagesSection.css";

const PizzaStagesSection = () => {
  const [pizza, setPizza] = useState(
    () => JSON.parse(localStorage.getItem("pizzaOrder")) || [],
  );

  console.log({ pizza });

  const [currentTime, setCurrentTime] = useState(Date.now());
  const pickedIntervalId = useRef(null);
  const orderPlacedStage = getStages(pizza, "order-placed");
  const orderInMakingStage = getStages(pizza, "order-in-making");
  const orderReadyStage = getStages(pizza, "order-ready");
  const orderPickedStage = getStages(pizza, "order-picked");
  const cancelledStage = getStages(pizza, "cancelled");

  const hasActiveOrder = pizza.some(
    (data) => data.stage !== "order-picked" && data.stage !== "cancelled",
  );

  useEffect(() => {
    localStorage.setItem("pizzaOrder", JSON.stringify(pizza));
  }, [pizza]);

  useEffect(() => {
    if (!hasActiveOrder) {
      return;
    }

    if (pizza.length > 0) {
      pickedIntervalId.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    }

    return () => clearInterval(pickedIntervalId.current);
  }, [hasActiveOrder]);

  const sortedDataOnTimeDelay = [...pizza].sort((a, b) => {
    const timeA =
      (a?.pickedTime || a.cancelledTime || currentTime) - a?.placedStartTime;
    const timeB =
      (b?.pickedTime || b.cancelledTime || currentTime) - b?.placedStartTime;

    return timeB - timeA;
  });

  const cancelHandler = (pizzaID) => {
    const now = Date.now();
    setPizza((preData) => {
      return preData.map((pizza) => {
        if (pizza.id === pizzaID) {
          return { ...pizza, stage: "cancelled", cancelledTime: now };
        }
        return pizza;
      });
    });
  };

  return (
    <>
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
                  setPizza={setPizza}
                  pickedIntervalId={pickedIntervalId}
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
                  setPizza={setPizza}
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
                  setPizza={setPizza}
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
                  setPizza={setPizza}
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
                  setPizza={setPizza}
                  isPicked={pizza.picked}
                  pickedTime={pizza.pickedTime}
                  cancelHandler={cancelHandler}
                  pizzaName={pizzaName}
                />
              );
            })}
          </div>
        </div>

        {!pizza.length ? (
          ""
        ) : (
          <>
            <h3>Main Section</h3>
            <div className="pizza-main-section-container">
              <table className="pizza-main-section-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Stage</th>
                    <th>Total time spent(time from order place)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDataOnTimeDelay.map((data) => {
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
                    return (
                      <tr
                        style={{
                          backgroundColor: isPizzaCancelled ? "#70696e" : "",
                          color: isPizzaCancelled ? "black" : "",
                        }}
                        key={data.id}
                      >
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
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default PizzaStagesSection;
