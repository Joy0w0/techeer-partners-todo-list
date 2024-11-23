import React, { useState, useEffect } from "react";
import styled from "styled-components";
import plus from "../assets/images/plus.png";
import notyet from "../assets/images/notyet.png";
import trash from "../assets/images/trash.png";
import completed from "../assets/images/completed.png";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("전체");

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    fetchFilteredTasks(filter);
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        await fetch(`${BASE_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTask, isDone: false }),
        });
        setNewTask("");
        fetchTasks();
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const handleToggleComplete = async (id, isDone, currentTitle) => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: currentTitle,
          isDone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isDone } : task
        )
      );
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const fetchFilteredTasks = async (filter) => {
    try {
      if (filter === "완료") {
        const response = await fetch(`${BASE_URL}/tasks/completed`);
        const data = await response.json();
        setTasks(data.data);
      } else if (filter === "미완료") {
        const response = await fetch(`${BASE_URL}/tasks/incomplete`);
        const data = await response.json();
        setTasks(data.data);
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error("Failed to fetch filtered tasks:", error);
    }
  };

  useEffect(() => {
    fetchFilteredTasks(filter);
  }, [filter]);

  return (
    <Background>
      <ListContainer>
        <Wrapper>
          <Title>Todo List</Title>
          <InputWrapper>
            <TodoInput
              type="text"
              placeholder="Add a new task ..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <PlusButton onClick={handleAddTask}>
              <PlusImage src={plus} alt="Add Task" />
            </PlusButton>
          </InputWrapper>
          <FilterButtons>
            {["전체", "완료", "미완료"].map((type) => (
              <FilterButton
                key={type}
                active={filter === type}
                onClick={() => setFilter(type)}
              >
                {type}
              </FilterButton>
            ))}
          </FilterButtons>
          <StyledTodoList>
            {tasks.map((task) => (
              <StyledTodoItem key={task.id}>
                <ActionButton
                  onClick={() => handleToggleComplete(task.id, !task.isDone, task.title)}
                >
                  <ActionImage
                    src={task.isDone ? completed : notyet}
                    alt={task.isDone ? "Completed" : "Not Completed"}
                    isDone={task.isDone}
                  />
                </ActionButton>
                <TodoText isDone={task.isDone}>{task.title}</TodoText>
                <DeleteButton onClick={() => handleDeleteTask(task.id)}>
                  <DeleteImage src={trash} alt="Delete Task" />
                </DeleteButton>
              </StyledTodoItem>
            ))}
          </StyledTodoList>
        </Wrapper>
      </ListContainer>
    </Background>
  );
}

export default TodoList;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(145deg, #a6c0fe 0%, #cda1c2 50%, #f68084 100%);
  background-repeat: no-repeat;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 41.125rem;
  height: 46rem;
  background-color: white;
  border-radius: 1.875rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: black;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 2.5rem;
  max-width: 34rem;
  margin: 0 auto;
  font-size: 1.8rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  width: 28rem;
  height: 2.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.3rem;
  outline: none;
  box-sizing: border-box;
  padding: 0.5rem;
  margin-right: 0.5rem;
  &::placeholder {
    color: #d9d9d9;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const PlusButton = styled.button`
  background-color: black;
  border-radius: 0.3rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const PlusImage = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const FilterButtons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "black" : "#d9d9d9")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const StyledTodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledTodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.8rem 0;
  width: 100%;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 0.3rem;
`;

const ActionImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.3s;
  filter: ${(props) => (props.isDone ? "invert(100%)" : "none")}; /* 완료된 항목은 검은색 표시 */
`;

const TodoText = styled.span`
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1.2rem;
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
  color: ${(props) => (props.isDone ? "#d9d9d9" : "black")};
  transition: color 0.3s, text-decoration 0.3s;
`;

const DeleteButton = styled.button`
background: transparent;
border: none;
cursor: pointer;
margin - left: 0.5rem;
`;

const DeleteImage = styled.img`
width: 1.8rem;
height: 1.8rem;
`;