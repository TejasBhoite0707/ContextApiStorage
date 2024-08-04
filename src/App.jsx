import { useEffect, useState } from 'react'
import {TodoProvider} from './Contexts'
import TodoForm from './Components/ToDoForm'
import TodoItem from './Components/ToDoItem'


export default function App() {
  const [todos,setTodos]=useState([])
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
  const updateTodo=(id,todo)=>{
setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id=== id ? todo : prevTodo)))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  const ToggleUpdate=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed} :prevTodo))
  }

  useEffect(()=>{
let Savedtodos=localStorage.getItem("todos")
if(Savedtodos){
const ParseTodos=JSON.parse(Savedtodos)
  if (ParseTodos && ParseTodos.length > 0) {
    setTodos(ParseTodos)
  }
}

  },[])

  useEffect(()=>{
    localStorage.setItem('todos' ,JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo, updateTodo, deleteTodo,ToggleUpdate}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          
            <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo)=>(
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo}/>
                  </div>
              ))
              
            }
        </div>
    </div>
</div>
</TodoProvider>
  )
}

