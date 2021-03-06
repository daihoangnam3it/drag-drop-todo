import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 } from 'uuid';
import Columns from './components/Columns';
import {TiDeleteOutline} from 'react-icons/ti'
const App = () => {
  const [columns, setColumns] = useState(JSON.parse(localStorage.getItem('columns'))||[]);
  const [value, setValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isFocus, setIsFocus] = useState('input-name');
  const refAdd = useRef(null);
  useEffect(()=>{
      if(!localStorage.getItem('columns')){
        console.log('chưa có');
        localStorage.setItem('columns',JSON.stringify(columns))
      }
      localStorage.setItem('columns',JSON.stringify(columns))
  },[columns])
  const addColumn = async (name, e) => {
    const newColumn = {
      id: v4(),
      name: name,
      items: [],
    };

    const newColumnList = [...columns, newColumn];
    await setColumns(newColumnList);
    setIsAdd(false);
    setValue('');
    scrollTo(refAdd.current.scrollWidth);
  };
  const handleIsAdd = (e) => {
    setIsAdd(!isAdd);
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
        <TiDeleteOutline onClick={() => setIsAdd(false)}/>
      </InputColumn>
    );
  };
  const scrollTo = (width) => {
    refAdd.current.scrollTo(width + 200, 0);
  };

  const onDragEnd=(result)=>{
    const {destination,type,source,draggableId}=result;
    const currentColumns=[...columns]
    console.log(result);
    if(!destination) return 
    if(destination.index===source.index && destination.droppableId === source.droppableId) return;

    if(type==="column"){
      const newColumns=[...columns];
      const currentColumn=columns[source.index];
      newColumns.splice(source.index,1);
      newColumns.splice(destination.index,0,currentColumn);
      setColumns(newColumns);
      return;
    }
    const columnStart=currentColumns[currentColumns.findIndex(el=>el.id===source.droppableId)];
    const columnEnd=currentColumns[currentColumns.findIndex(el=>el.id===destination.droppableId)];
    // if(columnStart===columnEnd){
    //   console.log('avc');
    //   const newItemList=columnStart.items;
    //   const currentItem=newItemList[source.index];
    //   newItemList.splice(source.index,1);
    //   newItemList.splice(destination.index,0,currentItem)
    //   const newColumn=columns.map(el=>{
    //     if(el.id===columnStart.id){
    //       return {
    //         ...el,
    //         items:newItemList
    //       }
    //     }else{
    //       return{
    //         ...el
    //       }
    //     }
    //   })
    //   setColumns(newColumn);
    //   return
    // }
    const listItemsStart=columnStart.items;
    const currentItem=listItemsStart[source.index];
    const listItemsEnd=columnEnd.items;
    console.log('cur',currentItem);
    listItemsStart.splice(source.index,1);
    console.log('lis',listItemsStart);

    listItemsEnd.splice(destination.index,0,currentItem);
    console.log('lis3',listItemsEnd);
    const newColumn=currentColumns.map(el=>{
      if(el.id===columnStart.id){
        return {
          ...el,
          items:listItemsStart
        }
      }else if(el.id === columnEnd.id){
        return {
          ...el,
          items:listItemsEnd
        }
      }else{
        return {
          ...el
        }
      }
    })
    setColumns(newColumn);
    return
  }
  return (
    <DragDropContext
      onDragEnd={(result)=>onDragEnd(result)}
    >
      <Container ref={refAdd}>
        <Droppable
          droppableId='all-cloumn'
          type='column'
          direction='horizontal'
        >
          {(provided) => (
            <Column ref={provided.innerRef} {...provided.droppableProps}>
              {columns.map((el, index) => {
                return (
                  <Columns
                    key={el.id}
                    column={el}
                    columns={columns}
                    setColumns={setColumns}
                    index={index}
                  />
                );
              })}
              {isAdd ? (
                inputColumn()
              ) : (
                <Button onClick={(e) => handleIsAdd(e)}>Thêm thẻ</Button>
              )}
              {provided.placeholder}
            </Column>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 5px 10px;
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
  min-width: 100px;
`;
const Column = styled.div`
  display: flex;
  align-items: flex-start;
`;
const InputColumn = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  min-width: 250px;
  padding: 5px 10px;
  border:2px solid black;
`;

export default App;
