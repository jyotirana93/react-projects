import { memo } from "react";

const CellInput = memo(({ disabled, name, value, changeHandler, rowIndex }) => {
  return (
    <>
      <input
        disabled={disabled}
        type="text"
        name={name}
        value={value}
        onChange={(e) => changeHandler(e, rowIndex)}
      />
    </>
  );
});

export default CellInput;
