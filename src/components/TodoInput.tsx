import React, { useState, useEffect } from "react";
import axios from "axios";
import plus from "../assets/images/plus.png";
import completed from "../assets/images/completed.png";
import circle from "../assets/images/circle.png";
import trash from "../assets/images/trash.png";
import trashdone from "../assets/images/trashdone.png";

export default function TodoInput() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 할 일 목록 가져오기
  useEffect(() => {
    axios.get("/api/tasks")
      .then(response => {
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // 할 일 토글
  const handleToggle = (id) => {
    axios.patch(`/api/tasks/${id}/complete`)
      .then(() => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
      })
      .catch(error => console.error("Error toggling task:", error));
  };

  // Enter 키 눌렀을 때 할 일 추가
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleAddTask();
    }
  };

  // 할 일 추가
  const handleAddTask = () => {
    if (!newTask) return;

    axios.post("/api/tasks", { text: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // 할 일 삭제
  const handleDelete = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="flex flex-col w-[29rem] h-full overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-row justify-center">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex w-[29rem] h-[2.75rem] bg-white/15 text-[#d9d9d9] hover:bg-white/20 border border-[1px] border-solid border-[#d9d9d9] rounded-[0.3rem] p-[0.94rem] mr-[0.5rem] outline-none focus:placeholder-transparent placeholder-[#d9d9d9]"
          placeholder="Add a new Task..."
          onKeyDown={handleKeyDown}
        />
        <div
          onClick={handleAddTask}
          className="flex justify-center hover:scale-102 cursor-pointer bg-black/50 hover:bg-black/70 hover:rounded-[0.3rem] rounded-[0.3rem] min-w-[3.5rem] h-[2.75rem]"
        >
          <img src={plus} alt="추가" className="flex scale-50" />
        </div>
      </div>
      <div className="flex flex-col w-[29rem] h-full overflow-y-auto overflow-x-hidden">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-row w-[29rem] h-[2.75rem] mt-[2rem]">
            <div className="flex flex-row justify-start items-center w-[26rem]">
              <img
                src={task.isCompleted ? completed : circle}
                alt="상태 변경"
                className={`flex scale-[50%] hover:scale-[52%] cursor-pointer -ml-[12px] ${task.isCompleted ? "pl-[1px] opacity-[70%]" : ""}`}
                onClick={() => handleToggle(task.id)}
              />
              <span
                className={`flex hover:scale-[101%] cursor-pointer text-[#d9d9d9] ${task.isCompleted ? "line-through text-black opacity-[70%]" : ""}`}
                onClick={() => handleToggle(task.id)}
              >
                {task.text}
              </span>
            </div>
            <div className="flex w-full justify-end items-center w-[3rem]">
              <img
                src={task.isCompleted ? trashdone : trash}
                alt="삭제"
                className={`flex scale-[50%] hover:scale-[52%] cursor-pointer ${task.isCompleted ? "opacity-[70%]" : ""}`}
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
