import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'
import {FiDelete} from 'react-icons/fi' 

const Item = ({item,columns,setColumns,column,index}) => {
  const handleDeleteItem=()=>{
    const newItemsList=column.items.filter((el,index)=>el.id!==item.id)
    const newColumns=columns.map(el=>{
      if(el.id===column.id){
        return{
          ...el,items:newItemsList
        }
      }
      return el
    })
    setColumns(newColumns);
  }
  
  return (
    <Draggable draggableId={item.id} index={index}>
    {(provided,snapshot)=>(
      <Container
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
      <Title>{item.name}</Title>
      
      <button onClick={()=>handleDeleteItem()}><FiDelete/></button>
    </Container>
    )}
   
  
    </Draggable>
  )
}
const Container=styled.div`
  width:100%;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  border:2px solid black;
  margin:5px 0;
  background-color:${({ isDragging }) =>
    isDragging ? "#F5C6AA" : "white"};

  button{
    width:10%;
    background:transparent;
    outline:none;
    border:none;
    cursor: pointer;
  }

`
const Title=styled.div`
  width:80%;
  text-align:left;
  padding:2px 5px;
  
`
export default Item
