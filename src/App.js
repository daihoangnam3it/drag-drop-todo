import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Columns from './components/Columns';
const App = () => {
  const [columns, setColumns] = useState([]);
  const [value, setValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isFocus, setIsFocus] = useState('input-name');
  const refAdd = useRef(null);

  const addColumn = async (name, e) => {
    const newColumn = {
      id: v4(),
      name: name,
      items: [],
    };

    const newColumnList = [...columns, newColumn];
    await setColumns(newColumnList);
    console.log(refAdd);
    setIsAdd(false);
    setValue('');
    scrollTo(refAdd.current.scrollWidth);
  };
  const handleIsAdd = (e) => {
    setIsAdd(!isAdd);
    refAdd.current.scrollTo(20, 0);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const inputColumn = () => {
    return (
      <InputColumn>
        <input
          type='text'
          value={value}
          onChange={handleInput}
          name='input-name'
          autoFocus={isFocus}
        />
        <button
          onClick={(e) => {
            addColumn(value, e);
          }}
        >
          Thêm
        </button>
        <button onClick={() => setIsAdd(false)}>X</button>
      </InputColumn>
    );
  };
  const scrollTo = (width) => {
    console.log(width);
    refAdd.current.scrollTo(width, 0);
  };
  return (
    <Container ref={refAdd}>
      <Column>
        {columns.map((el, index) => {
          return (
            <Columns
              key={el.id}
              column={el}
              columns={columns}
              setColumns={setColumns}
            />
          );
        })}
        {isAdd ? (
          inputColumn()
        ) : (
          <Button onClick={(e) => handleIsAdd(e)}>Thêm thẻ</Button>
        )}
      </Column>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding:5px 10px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: lightpink;
    border-radius: 20px;
    cursor: pointer;
    height: 5px;
    width: 40px;
    padding: 0 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  #board::-webkit-scrollbar-track-piece {
    background: rgba(0, 0, 0, 0.15);
  }
`;
const Button = styled.div`
  background-color: transparent;
  outline: none;
  border: 3px solid black;
  cursor: pointer;
  padding: 5px 10px;
  min-width:100px;
`;
const Column = styled.div`
  display: flex;
  align-items:flex-start;

`;
const InputColumn=styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:flex-start;
  min-width:250px;
  background-color:lightgrey;
  padding:5px 10px;
`
export default App;
