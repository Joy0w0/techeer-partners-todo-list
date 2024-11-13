import React, { useState } from "react";
import plus from "../assets/images/plus.png";
import completed from "../assets/images/completed.png";
import notyet from "../assets/images/notyet.png";
import trash from "../assets/images/trash.png";

export default function TodoInput() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleAddTask();
    }
  };

  const handleAddTask = async () => {
    if (!newTask) return;

    // 여기는 실제 API 호출이 들어갈 부분입니다.
    const newTaskItem = { id: tasks.length + 1, text: newTask, isCompleted: false };

    // 실제로는 서버에 전송하고, 응답을 받아 상태를 업데이트합니다.
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col w-[29rem] h-full overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-row justify-center">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex w-[29rem] h-[2.75rem] border border-[1px] border-solid border-[#d9d9d9] rounded-[0.3rem] p-[0.94rem] mr-[0.5rem] outline-none focus:placeholder-transparent placeholder-[#d9d9d9]"
          placeholder="Add a new Task..."
          onKeyDown={handleKeyDown}
        />
        <div
          onClick={handleAddTask}
          className="flex justify-center hover:scale-105 cursor-pointer bg-black rounded-[0.3rem] w-[3.5rem] h-[2.75rem]"
        >
          <img src={plus} alt="추가" className="flex scale-50" />
        </div>
      </div>
      <div className="flex flex-col w-[29rem] h-full overflow-y-auto overflow-x-hidden">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-row w-[29rem] h-[2.75rem] mt-[2rem]">
            <div className="flex flex-row justify-start items-center w-[26rem]">
              <img
                src={task.isCompleted ? completed : notyet}
                alt="상태 변경"
                className="flex scale-[50%] hover:scale-[52%] cursor-pointer -ml-[12px]"
                onClick={() => handleToggle(task.id)}
              />
              <span
                className={`flex hover:scale-[101%] cursor-pointer ${task.isCompleted ? "line-through text-[#d9d9d9]" : ""}`}
                onClick={() => handleToggle(task.id)}
              >
                {task.text}
              </span>
            </div>
            <div className="flex w-full justify-end items-center w-[3rem]">
              <img
                src={trash}
                alt="삭제"
                className="flex scale-[50%] hover:scale-[52%] cursor-pointer"
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
