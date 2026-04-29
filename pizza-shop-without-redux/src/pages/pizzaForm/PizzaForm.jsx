import { useEffect, useRef, useState } from "react";
import "./PizzaForm.css";
import { usePizzaOptions } from "../../hooks/usePizzaOptions";
import { useID } from "../../hooks/useID";

const PizzaForm = () => {
  const [pizzaForm, setPizzaForm] = useState({
    type: "veg",
    pizza: "Peppy Paneer",
    size: "small",
    base: "thin",
  });
  const [pizzaData, setPizzaData] = useState(
    () => JSON.parse(localStorage.getItem("pizzaOrder")) || [],
  );
  const { type, name, size, base } = usePizzaOptions(pizzaForm);
  const { createPizzaID } = useID();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setPizzaForm((preData) => {
        if (value === "non-veg") {
          return {
            ...preData,
            pizza: "Chicken Golden Delight",
            size: "small",
            base: "thin",
          };
        } else {
          return {
            ...preData,
            pizza: "Peppy Paneer",
            size: "small",
            base: "thin",
          };
        }
      });
    }

    setPizzaForm((preData) => {
      //whenever pizza name changes, it resets the size and base
      if (name === "pizza") {
        return { ...preData, size: "small", base: "thin" };
      }

      return { ...preData, [name]: value };
    });

    setPizzaForm((preData) => {
      return { ...preData, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const createdNewPizza = createPizzaID(pizzaForm);

    setPizzaData((preData) => {
      const updatedData = [...preData, createdNewPizza];
      return updatedData;
    });
  };

  useEffect(() => {
    if (pizzaData.length > 0) {
      localStorage.setItem("pizzaOrder", JSON.stringify(pizzaData));
    }
  }, [pizzaData]);

  return (
    <>
      <section>
        <form onSubmit={submitHandler}>
          <div className="pizza-form">
            <h2>Pizza Form</h2>
            <span className="pizza-form-options">
              <label htmlFor="type">Type</label>

              <select
                name="type"
                id="type"
                value={pizzaForm.type}
                onChange={changeHandler}
                style={{ textTransform: "capitalize" }}
              >
                {type.map((pizzaType) => {
                  return (
                    <option key={pizzaType} value={pizzaType}>
                      {pizzaType}
                    </option>
                  );
                })}
              </select>
            </span>
            <span className="pizza-form-options">
              <label htmlFor="pizza">Pizza</label>
              <select
                name="pizza"
                id="pizza"
                value={pizzaForm.pizza}
                onChange={changeHandler}
              >
                {name.map((pizzaName) => {
                  return (
                    <option key={pizzaName} value={pizzaName}>
                      {pizzaName}
                    </option>
                  );
                })}
              </select>
            </span>

            <span className="pizza-form-options">
              <label htmlFor="size">Size</label>
              <select
                style={{ textTransform: "capitalize" }}
                name="size"
                id="size"
                value={pizzaForm.size}
                onChange={changeHandler}
              >
                {size.map((pizzaSize) => {
                  return (
                    <option key={pizzaSize} value={pizzaSize}>
                      {pizzaSize}
                    </option>
                  );
                })}
              </select>
            </span>
            <span className="pizza-form-options">
              <label htmlFor="base">Base</label>
              <select
                style={{ textTransform: "capitalize" }}
                name="base"
                id="base"
                value={pizzaForm.base}
                onChange={changeHandler}
              >
                {base.map((pizzaBase) => {
                  return (
                    <option key={pizzaBase} value={pizzaBase}>
                      {pizzaBase}
                    </option>
                  );
                })}
              </select>
            </span>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PizzaForm;
