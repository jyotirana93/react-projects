const pizzaList = [
  {
    id: 1,
    type: "Non-Veg",
    name: "Chicken Golden Delight",
    variants: [
      { size: "small", base: "thin" },
      { size: "medium", base: "thin" },
      { size: "large", base: "thin" },
    ],
    imageUrl:
      "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(14).png",
  },
  {
    id: 2,
    type: "Non-Veg",
    name: "Non Veg Supreme",
    variants: [
      { size: "small", base: "thin" },
      { size: "medium", base: "thin" },
    ],
    imageUrl:
      "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(13).png",
  },
  {
    id: 3,
    type: "Non-Veg",
    name: "Chicken Dominator",
    variants: [
      { size: "small", base: "thin" },
      { size: "small", base: "thick" },
      { size: "medium", base: "thin" },
      { size: "medium", base: "thick" },
      { size: "large", base: "thin" },
      { size: "large", base: "thick" },
    ],
    imageUrl:
      "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(11).png",
  },
  {
    id: 4,
    type: "Veg",
    name: "Peppy Paneer",
    variants: [
      { size: "small", base: "thin" },
      { size: "small", base: "thick" },
      { size: "large", base: "thin" },
    ],
    imageUrl: "https://www.dominos.co.in/files/items/Peppy_Paneer.jpg",
  },
  {
    id: 5,
    type: "Veg",
    name: "Cheese N Corn",
    variants: [
      { size: "small", base: "thin" },
      { size: "large", base: "thick" },
    ],
    imageUrl: "https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg",
  },
  {
    id: 6,
    type: "Veg",
    name: "Mexican Green Wave",
    variants: [
      { size: "small", base: "thin" },
      { size: "small", base: "thick" },
      { size: "medium", base: "thin" },
      { size: "large", base: "thin" },
    ],
    imageUrl: "https://www.dominos.co.in/files/items/Mexican_Green_Wave.jpg",
  },
];

export const usePizzaOptions = (pizzaForm) => {
  const orderMap = {
    veg: 0,
    "non-veg": 1,
  };
  const pizzaType = [...new Set(pizzaList.map((pizza) => pizza.type))];

  const pizzaName = pizzaList
    .filter((pizza) => pizza.type.toLocaleLowerCase() === pizzaForm.type)
    .map((pizza) => pizza.name);

  const sortedPizzaType = pizzaType
    .map((type) => type.toLocaleLowerCase())
    .sort((a, b) => orderMap[a] - orderMap[b]);

  const selectedPizza = pizzaList.filter((pizza) => {
    return (
      pizza.type.toLocaleLowerCase() === pizzaForm.type &&
      pizza.name === pizzaForm.pizza
    );
  });

  const pizzaSize = [
    ...new Set(selectedPizza[0]?.variants?.map((pizza) => pizza.size)),
  ];

  const pizzaBase = [
    ...new Set(selectedPizza[0]?.variants?.map((pizza) => pizza.base)),
  ];

  return {
    type: sortedPizzaType,
    name: pizzaName,
    size: pizzaSize,
    base: pizzaBase,
  };
};
