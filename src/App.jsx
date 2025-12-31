import { useState } from 'react'
import { Booklist } from './components/books/showBooks.jsx'
import { AuthorsList } from './components/books/authors'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showTasks, setShowTasks] = useState(true);
  const showTasksClicked = () => {
    setShowTasks(!showTasks);
  }
  const [showInput, setShowInput] = useState(true);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    alert(`HELLO TO ${librarianName}`)
    setShowInput(!showInput); 
  };

  const [librarianName, setLibrarianName] = useState('');

  const handleNameChange = (event) => {
    
    setLibrarianName(event.target.value);
  };


  return (

    <div>

      <button onClick={showTasksClicked} > {showTasks ? 'show authers' : 'show books'}  </button>
      {showTasks ?<Booklist /> : <AuthorsList /> }
     {showInput?
      <form onSubmit={handleInputSubmit}>
          <p>לכניסת ספרנית</p>
          <input
            id='inputAuthor'
            type="text"
            placeholder='insert your Name'
            value={librarianName}
            onChange={handleNameChange}
          /><br/>
          <button type="submit">Submit</button>
        </form> :'' }
        <p>שם הספרנית: {librarianName}</p>
    </div>


  )
}

export default App
