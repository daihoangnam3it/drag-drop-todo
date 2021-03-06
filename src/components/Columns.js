import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable,Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import Item from './Item';
import {RiChatDeleteLine} from 'react-icons/ri'
const Columns = ({ column, columns, setColumns, index }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState('input-name');
  const deleteColumns=()=>{
    const newColumns=columns.filter(el=>el.id!==column.id);
    setColumns(newColumns);
  }
  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const addItem = (name, id) => {
    const newItem = {
      id: v4(),
      name: name,
    };
    const newColumns = columns.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          items: [...el.items, newItem],
        };
      }
      return el;
    });
    setColumns(newColumns);
    setIsAdd(false);
    setValue('');
  };
  const inputItem = () => {
    return (
      <InputItem>
        <input
          type='text'
          value={value}
          onChange={handleInput}
          name='input-name'
          autoFocus={isFocus}
          placeholder='Nhập thông tin'
        />
        <button onClick={() => addItem(value, column.id)}>+</button>
        <button onClick={() => setIsAdd(false)}>X</button>
      </InputItem>
    );
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided,snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}  isDragging={snapshot.isDragging} >
          <BtnDelete onClick={()=>deleteColumns()}><RiChatDeleteLine/></BtnDelete>
          <Title {...provided.dragHandleProps}>{column.name}</Title>
          <Droppable droppableId={column.id} type="item">
          {(provided,snapshot)=>(
            <ColumnList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
            {column.items.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  item={item}
                  columns={columns}
                  setColumns={setColumns}
                  column={column}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </ColumnList>
          )}
          
          
          </Droppable>
          {isAdd ? (
            inputItem()
          ) : (
            <Button onClick={() => setIsAdd(true)}>Thêm thẻ</Button>
          )}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  min-width: 250px;
  min-height: 150px;
  border: 3.5px solid #4f4848;
  border-radius:2px;
  margin: 0 8px;
  display: inline-block;
  padding: 5px 10px;
  position:relative;
  background-color:${({ isDragging }) =>
    isDragging ? "#F8E1D1" : "#F8E1D1"};

`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px 0;
`;
const BtnDelete=styled.div`
  position:absolute;
  top:10px;
  right:10px;
  cursor: pointer;
`
const Button = styled.button`
  width: 100%;
  text-align: left;
  padding: 2px 5px;
  margin: 0 auto;
  background-color:#FDC4CA;
  border:2px solid #4f4848;
  cursor: pointer;
`;
const InputItem = styled.div`
  width: 100%;
  padding: 2px 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  button {
    width: 10%;
  }
  input {
    width: 70%;
  }
`;
const ColumnList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;

`;
export default Columns;
// {isAddT?inputItem(addItem,el.id):<Button onClick={()=>handleIsAddT()}>Thêm thẻ tassk</Button>}
