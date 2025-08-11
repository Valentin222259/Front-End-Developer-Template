//import React from "react";
import Card from "./components/card/Card";
import Input from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import TextArea from "./components/input/TextArea";
import Button from "./components/button/Button";
import "./App.css";
import Modal from "./components/modal/Modal";
import React, { useState } from "react"; 

const TODOS_MOCK = [
  {
    id: "1",
    title: "Todo 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At id illo repellendus non maiores in pariatur aliquam iure fugit amet!",
    completed: false,
  },
  {
    id: "2",
    title: "Todo 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
  {
    id: "3",
    title: "Todo 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "4",
    title: "Todo 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: true,
  },
  {
    id: "5",
    title: "Todo 5",
    description: "Fa debug la acel program",
    completed: true,
  },
  {
    id: "6",
    title: "Todo 6",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit!",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS_MOCK); 
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (isEditMode && editTodoId) {
    // actualizam todo-ul existent
    const updatedTodos = todos.map(todo => {
      if (todo.id === editTodoId) {
        return {
          ...todo,
          title: newTitle,
          description: newDescription,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  } else {
    // cream un todo nou
    const newTodo = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  // resetare state
  setNewTitle("");
  setNewDescription("");
  setIsEditMode(false);
  setEditTodoId(null);
  setIsModalOpen(false);
};


  const handleToogleComplete = (id) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodos); //se actualizeaza state-ul
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    setNewTitle(todoToEdit.title);
    setNewDescription(todoToEdit.description);
    setEditTodoId(id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className="app-container">
        {/* 
            This is your Create Card component.
          */}

        {/* 
          My Todos
        */}
        <Card>
          <h1>My todos</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add +</Button>
          <div className="list-container">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onToggleComplete={handleToogleComplete}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))}
          </div>

          <div className="separator"></div>

          <h2>Completed</h2>
          <div className="list-container">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onToggleComplete={handleToogleComplete}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))}
          </div>
        </Card>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Create todo</h2>
          <form onSubmit={handleSubmit}>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              type="text"
            />
            <TextArea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
            />
            <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default App;
