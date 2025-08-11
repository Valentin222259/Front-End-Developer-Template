import React, { useState } from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {
  const handleCheckboxChange = () => {
    if (props.onToggleComplete) {
      props.onToggleComplete(props.id); //apelam callback din app
    }
  };

  return (
    <div className={`todo-item ${props.completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox
            checked={!!props.completed}
            onChange={handleCheckboxChange}
          />

          <h4>{props.title}</h4>
        </div>
        <div>
          <i
            className="fa fa-pencil"
            aria-hidden="true"
            onClick={() => props.onEdit && props.onEdit(props.id)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          ></i>
          <i
            className="fa fa-trash"
            aria-hidden="true"
            onClick={() => props.onDelete && props.onDelete(props.id)}
            style={{ cursor: "pointer", marginRight: "8px" }}
          ></i>
        </div>
      </div>

      <div className="separator"></div>

      <p>{props.description}</p>
    </div>
  );
};

export default TodoItem;
