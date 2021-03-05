import React ,{useState}from 'react'
import styled from 'styled-components';
import {v4} from 'uuid'
import Item from './Item'
const Columns = ({column,columns,setColumns}) => {
  const [isAdd,setIsAdd]=useState(false)
  const [value,setValue]=useState('')
  const [isFocus,setIsFocus]=useState('input-name')

  const handleInput=(e)=>{
    const value=e.target.value;
    setValue(value)
  }
  

  const addItem=(name,id)=>{
    const newItem={
      id:v4(),
      name:name,
    }
     const newColumns=columns.map(el=>{
       if(el.id===id){
         return{
           ...el,items:[...el.items,newItem]
         }
       }
       console.log(el);
       return el
     })
     setColumns(newColumns)
     setIsAdd(false)
     setValue('')
  }
  const inputItem=()=>{
    return <InputItem>
      <input  type="text" value={value} onChange={handleInput} name="input-name" autoFocus={isFocus} placeholder="Nhập thông tin"/>
      <button onClick={()=>addItem(value,column.id)}>+</button>
      <button onClick={()=>setIsAdd(false)}>X</button>
    </InputItem>
  }
  return (
    <Container>
        <Title>{column.name}</Title>
        <ColumnList>
        {column.items.map((item,index)=>{
          return <Item key={item.id} item={item} columns={columns} setColumns={setColumns} column={column}/>
        })}
        </ColumnList>
        {isAdd?inputItem():<Button onClick={()=>setIsAdd(true)}>Thêm thẻ</Button>}
    </Container>
  )
}

const Container=styled.div`
  min-width:250px;
  min-height:150px;
  border:2px solid black;
  margin:0 8px;
  display:inline-block;
  padding:5px 10px;
  
`
const Title=styled.div`
  width:100%;
  text-align:center;
  padding:5px 0;
` 

const Button=styled.button`
  width:100%;
  text-align:left;
  padding:2px 5px;
  margin:0 auto;
`
const InputItem=styled.div`
  width:100%;
  padding:2px 5px;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  button{
    width:10%;
  }
  input{
    width:70%;
  }
`
const ColumnList=styled.div`
  display:flex;
  flex-direction:column;
  padding:5px 10px;

`
export default Columns
// {isAddT?inputItem(addItem,el.id):<Button onClick={()=>handleIsAddT()}>Thêm thẻ tassk</Button>}
 