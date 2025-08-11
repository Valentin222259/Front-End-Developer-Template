import React, { useState, useEffect } from "react";
import "./Checkbox.css";

const Checkbox = ({ checked: checkedProp, onChange }) => {
  const [checked, setChecked] = useState(!!checkedProp);

  // sincronizam starea locala daca props.checked se schimba
  useEffect(() => {
    setChecked(!!checkedProp);
  }, [checkedProp]);

  const handleCheckboxChange = (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked); // notificam parintele
    }
  };

  return (
    <div className="round">
      <input
        checked={checked}
        onChange={handleCheckboxChange}
        type="checkbox"
      />
      <label
        className={`checkbox ${checked ? "checkbox--active" : ""}`}
        htmlFor="checkbox"
      ></label>
    </div>
  );
};

export default Checkbox;
