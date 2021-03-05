import React from 'react'
import styled from 'styled-components'
const Item = ({item,columns,setColumns,column}) => {
  const handleDeleteItem=()=>{
    const newItemsList=column.items.filter((el,index)=>el.id!==item.id)
    console.log(newItemsList);
    const newColumns=columns.map(el=>{
      if(el.id===column.id){
        return{
          ...el,items:newItemsList
        }
      }
      console.log(el);
      return el
    })
    setColumns(newColumns);
  }
  
  return (
    <Container>
    <Title>{item.name}</Title>
      
      <button onClick={()=>handleDeleteItem()}>X</button>
    </Container>
  )
}
const Container=styled.div`
  width:100%;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  border:2px solid black;
  margin:5px 0;
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
