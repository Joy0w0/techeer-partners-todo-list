import React, { useState } from 'react';
import styled from 'styled-components';
import plus from '../assets/images/plus.png';
import notyet from '../assets/images/notyet.png';
import trash from '../assets/images/trash.png';
import completed from '../assets/images/completed.png';

function TodoList() {
  const [todo,setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = async () => {
    if (todo.trim()) {
      const newTodo = { id: Date.now(), text: todo};
    
        // tasks 를 정의하지 않아서 오류 발생,,
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo, isDone: false }),
    });

    if (!response.ok) {
      throw new Error('Failed to add task');
    }
      
    console.log('할 일이 성공적으로 추가되었습니다:', await response.json());

    } catch (error) {
      console.error('할 일 추가 중 오류 발생:', error);
    }

    setTodoList([...todoList, newTodo]);
    setTodo('');

    }
  };

  return (
    <Background>
      <ListContainer>
        <Wrapper>
          <Title>Todo List</Title>
          <InputWrapper>
            <TodoInput value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='Add a new Task ...' />
            <PlusButton onClick={handleAddTodo}>
              <PlusImage src={plus} alt="plus" />
            </ PlusButton>
          </InputWrapper>
        </Wrapper>
      </ListContainer>
    </Background>
  );
}

export default TodoList;

const InputWrapper = styled.div`
  display:flex;
  flex-direction: row;
`;

const PlusImage = styled.img`
  width: 24px;
  height: 24px;
`

const PlusButton = styled.button`
  width: 60px;
  height: 46px;
  background-color: black;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const TodoInput = styled.input`
  width: 467px;
  height: 46px;
  border: 1px solid #d9d9d9;
  border-radius: 0.3rem;
  outline: none;
  box-sizing: border-box;
  padding: 0px 16px;
  margin-right: 8px;

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus:placeholder {
    color: transparent;
  }
`;

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
`;
