import { useEffect, useRef, useState } from "react";
import "./Card.css";

const Card = ({
  orderPlacedTime,
  makingStartTime,
  readyStartTime,
  pickedTime,
  orderNumber,
  size,
  stage,
  setPizza,
  isPicked,
  pickedIntervalId,
  cancelHandler,
  pizzaName,
}) => {
  const smallPizzaMakinTime = 180000; // 3 minutes
  const mediumPizzMakingTime = 240000; // 4 minutes
  const largePizzaMakingTime = 300000; // 5 minutes

  const makingTimeLookUp = {
    small: smallPizzaMakinTime,
    medium: mediumPizzMakingTime,
    large: largePizzaMakingTime,
  };

  const prepTime = makingTimeLookUp[size]; //dynamic time for small,medium and large
  const endTime = makingStartTime + prepTime;

  const intervalID = useRef(null);

  const [remainingTime, setRemainingTime] = useState(
    () => endTime - Date.now(),
  );
  const [orderPlacedWatingTime, setOrderPlacedWatingTime] = useState(0);
  const [readyWaitingTime, setReadyWaitingTime] = useState(0);

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  const inMinutes = Math.floor(orderPlacedWatingTime / 60000);
  const inSeconds = Math.ceil((orderPlacedWatingTime / 1000) % 60);

  const readyTimeInMinutes = Math.floor(readyWaitingTime / 60000);
  const readyTimeInSeconds = Math.floor((readyWaitingTime / 1000) % 60);

  const isMoreThanPrepTime = remainingTime > 180000;
  const isWatingTime =
    orderPlacedWatingTime > 180000 || readyWaitingTime > 180000;
  const isCancelled = stage === "cancelled";

  useEffect(() => {
    intervalID.current = setInterval(() => {
      if (stage === "order-placed") {
        const orderWatingTime = Date.now() - orderPlacedTime;
        setOrderPlacedWatingTime(orderWatingTime);
      } else if (stage === "order-in-making") {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
          clearInterval(intervalID.current);
          setRemainingTime(0);
        } else {
          setRemainingTime(timeLeft);
        }
      } else if (stage === "order-ready") {
        const ReadyTime = Date.now() - readyStartTime;
        setReadyWaitingTime(ReadyTime);
      } else {
        clearInterval(intervalID.current);
        setOrderPlacedWatingTime(0);
      }
    }, 1000);

    return () => clearInterval(intervalID.current);
  }, []);

  const nextHandler = (ordNumber) => {
    clearInterval(intervalID.current);
    intervalID.current = 0;
    setOrderPlacedWatingTime(0);

    setPizza((preData) => {
      return preData.map((pizza) => {
        if (pizza.id === ordNumber && pizza.stage === "order-placed") {
          return {
            ...pizza,
            stage: "order-in-making",
            makingStartTime: Date.now(),
          };
        }
        if (pizza.id === ordNumber && pizza.stage === "order-in-making") {
          return { ...pizza, stage: "order-ready", readyStartTime: Date.now() };
        }
        if (pizza.id === ordNumber && pizza.stage === "order-ready") {
          return {
            ...pizza,
            stage: "order-picked",
            picked: true,
            pickedTime: Date.now(),
          };
        }

        return pizza;
      });
    });
  };

  return (
    <div
      className={`card-main ${isWatingTime || isMoreThanPrepTime ? "card-warning" : ""}`}
    >
      <span>Order {orderNumber}</span>
      <span style={{ fontSize: "18px" }}>{pizzaName} Pizza</span>

      {remainingTime ? (
        <span>
          {minutes} min {seconds} sec
        </span>
      ) : readyWaitingTime ? (
        <span>
          {readyTimeInMinutes} min {readyTimeInSeconds} sec
        </span>
      ) : (
        <span>
          {isPicked || isCancelled ? "" : `${inMinutes} min ${inSeconds} sec`}
        </span>
      )}

      <button
        style={{ display: isPicked || isCancelled ? "none" : "" }}
        onClick={() => nextHandler(orderNumber)}
      >
        Next
      </button>
      {isPicked && (
        <div className="card-stage-picked">
          <span> Picked</span>
          <span className="card-stage-picked-icon">✔️</span>
        </div>
      )}
      {isCancelled && (
        <div className="card-stage-cancelled">
          <span> Cancelled</span>
        </div>
      )}
    </div>
  );
};

export default Card;
