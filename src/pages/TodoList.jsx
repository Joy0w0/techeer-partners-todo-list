import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import plus from '../assets/images/plus.png';
import notyet from '../assets/images/notyet.png';
import trash from '../assets/images/trash.png';
import completed from '../assets/images/completed.png';

function TodoList() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const API_BASE_URL = 'http://localhost:8080'; // API URL

  // 할 일 목록 가져오기 (초기화 시 호출)
  useEffect(() => {
    fetchIncompleteTasks();
  }, []);

  // 미완료 일 조회
  const fetchIncompleteTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/incomplete`);
      if (!response.ok) throw new Error('Failed to fetch incomplete tasks');

      const data = await response.json();
      setTodoList(data.data || []);
    } catch (error) {
      console.error('Error fetching incomplete tasks:', error);
    }
  };

  // 할 일 추가
  const handleAddTodo = async () => {
    if (todo.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: todo, isDone: false }),
        });
        if (!response.ok) throw new Error('Failed to add task');

        setTodo('');
        fetchIncompleteTasks(); // 추가 후 목록 새로고침
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // 할 일 수정
  const handleUpdateTodo = async (id, title, isDone) => {
    console.log('Updating Todo:', id, title, isDone); // 디버깅용 콘솔 로그
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, isDone }), // 여기서 title과 isDone을 바로 사용
      });
      if (!response.ok) throw new Error('Failed to update task');
      fetchIncompleteTasks(); // 수정 후 목록 새로고침
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // 할 일 삭제
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');

      fetchIncompleteTasks(); // 삭제 후 목록 새로고침
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Background>
      <ListContainer>
        <Wrapper>
          <Title>Todo List</Title>
          <InputWrapper>
            <TodoInput
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add new task"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <PlusButton type="button" onClick={handleAddTodo}>
              <PlusImage src={plus} alt="plus" />
            </PlusButton>
          </InputWrapper>
          <StyledTodoList>
            {todoList.map((item) => (
              <StyledTodoItem key={item.id}>
                <ActionButton
                  type="button"
                  onClick={() =>
                    handleUpdateTodo(item.id, item.title, !item.isDone)
                  }>
                  <ActionImage
                    src={item.isDone ? completed : notyet}
                    alt="complete"
                  />
                </ActionButton>
                <TodoText isDone={item.isDone}>{item.title}</TodoText>
                <DeleteButton
                  type="button"
                  onClick={() => handleDeleteTodo(item.id)}>
                  <DeleteImage src={trash} alt="delete" />
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

// 스타일 정의
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
  width: 41.125rem;
  height: 46rem;
  background-color: white;
  border-radius: 1.875rem;
`;

const Title = styled.h1`
  font-size: 3rem;
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
  font-size: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  width: 29rem;
  height: 2.75rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.3rem;
  outline: none;
  box-sizing: border-box;
  padding: 0.94rem;
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
  width: 3.5rem;
  height: 2.75rem;
  cursor: pointer;
`;

const PlusImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
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
  margin: 1rem 0;
  width: 100%;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ActionImage = styled.img`
  width: 2rem;
  height: 2rem;
`;

const TodoText = styled.span`
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
  color: ${(props) =>
    props.isDone ? '#d9d9d9' : 'black'}; // 완료된 항목은 회색으로 변경
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const DeleteImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
