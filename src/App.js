import React, {useState, useEffect} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo'
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#19212a] to-[#19212a]`,
  container: `bg-slate-100 mx-w-[500px] md:w-1/2 md:m-auto rounded-md shadow-xl p-6 md:mt-20`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl rounded-md`,
  button: `border p-2 ml-4 bg-red-500 text-slate-100 rounded-md`,
  count: `text-center p-2`
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // Debug
  // console.log(input)

  // Create My Todo
  const createTodo = async (e) => {
    e.preventDefault(e)

    if (input === '') {
      alert('Data todo masih kosong!')
      return
    }

    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  // Read My Todo di Firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  },[])

  // Update My Todo di Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // Delete My Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>
          My Todo App
        </h3>
        <form className={style.form} onSubmit={createTodo}>
          <input className={style.input} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tambah Todo" />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null : (<p className={style.count}>{`Kamu Punya ${todos.length} Todo`}</p>)}
      </div>
    </div>
  );
}

export default App;
