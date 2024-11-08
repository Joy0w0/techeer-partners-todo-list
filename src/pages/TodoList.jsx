import React, { useState } from 'react';
import styled from 'styled-components';
import plus from '../assets/images/plus.png';
import notyet from '../assets/images/notyet.png';
import trash from '../assets/images/trash.png';
import completed from '../assets/images/completed.png';

function TodoList() {
  return (
    <Background>
      <ListContainer>
        <Wrapper>
          <Title>Todo List</Title>
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
