import { useState, useEffect, useRef } from "react";
import axios from "axios";
import plus from "../assets/images/plus.png";
import completed from "../assets/images/completed.png";
import circle from "../assets/images/circle.png";
import trash from "../assets/images/trash.png";
import trashdone from "../assets/images/trashdone.png";

export default function TodoInput() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null); // input 요소를 참조할 useRef 생성

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // input 요소에 커서 위치
    }
  }, []);
  // 할 일 추가
  const handleAddTask = () => {
    if (!newTask) return;
  
    axios
      .post("http://localhost:8080/tasks", { title: newTask })
      .then(() => {
        return axios.get("http://localhost:8080/tasks"); // 전체 작업 목록 다시 요청
      })
      .then((response) => {
        setTasks(
          response.data.map((task) => ({ ...task, isCompleted: task.done }))
        );
        setNewTask("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // 할 일 토글
  const handleToggle = (id) => {
    // 현재 상태에서 토글하려는 task 찾기
    const currentTask = tasks.find((task) => task.id === id);
  
    if (!currentTask) return; // task가 없으면 종료
  
    // 현재 done 값을 반대로 보내도록 요청
    axios
      .patch(`http://localhost:8080/tasks/${id}/complete`, {
        done: !currentTask.isCompleted,
      })
      .then(() => {
        return axios.get("http://localhost:8080/tasks"); // 전체 작업 목록 다시 요청
      })
      .then((response) => {
        setTasks(
          response.data.map((task) => ({ ...task, isCompleted: task.done })) // 서버 데이터로 상태 업데이트
        );
      })
      .catch((error) => console.error("Error toggling task:", error));
  };

  // Enter 키 눌렀을 때 할 일 추가
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTask();
    }
  };

  const handleDelete = (id) => {
    // 서버에 요청 보내기 전에 즉시 UI 업데이트
    setTasks(tasks.filter((task) => task.id !== id)); // 삭제한 항목 바로 반영
  
    // 서버에서 삭제 요청 처리
    axios
      .delete(`http://localhost:8080/tasks/${id}`)
      .catch((error) => {
        console.error("Error deleting task:", error);
        // 삭제 실패 시, 상태 복원
        // 실패하면 삭제된 항목을 다시 상태에 추가 (옵션)
        setTasks((prevTasks) => [...prevTasks, tasks.find((task) => task.id === id)]);
      });
  };
  // 할 일 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(
            response.data.map((task) => ({ ...task, isCompleted: task.done })) // done을 isCompleted로 변환
          );
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="flex flex-col w-[29rem] h-full overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-row justify-center">
        <input
          ref={inputRef} // input 요소와 ref 연결
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
                {task.title}
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
