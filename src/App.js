import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import "./style.css";
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'todoApp.todos'




function App() {

  const [searchText, setSearchText] = useState("")

  const [gameList, setGameList] = useState([])

  
  //Zaidimo informacija pagal ID
  // useEffect(() => {
  //   const fetchData = async () =>{
  //     const result = await fetch(MATCH_BY_ID_CALL)
  //     result.json().then(json => {
  //       console.log(json)
  //     })
  //   }
  //   fetchData();
  // }, []);

  
  
  function getPlayerGames(event)
  {
    axios.get("http://localhost:4000/past20Games", {params: {username: searchText}})
    .then(function (response){
      setGameList(response.data)
    }).catch(function(error){
      console.log(error)
    })
  }
  
  
  console.log(gameList)

  
  
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)

  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleAddTodo(e)
  { 
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
    <div className="search"> 
    <label className="user">Username</label>
    <input className="searchBox" type="text" onChange={e=> setSearchText(e.target.value)}/>
    <button className="search" type="submit" onClick={getPlayerGames}> Search </button>
    </div>

    <div className="stats">
    <section className="stats1">
        <ul>
            <li className="totalStats">Ranked stats</li>
            <li className="totalStats">All stats</li>
            <li className="totalStats">Favorite champion stats</li>
        </ul>
    </section>
    <section className="stats2">
        <ul>
            <li className="match">Match 1</li>
            <li className="match">Match 2</li>
            <li className="match">Match 3</li>
        </ul>
    </section>
    </div>
    {
      gameList.length !== 0 ?
      <>
      {
      gameList.map((gameData,index) =>
      <>
      <h2>Game {index +1 }</h2>
      <div>
        {
          gameData.info.participants.map((data,participantIndex) =>
          <p>Player {participantIndex +1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
          )
        }
      </div>
      </>
      )
      }
      </>
      :
      <>
      <p>We have no Data!</p>
      </>

    }

    </>
  )
}

export default App;
