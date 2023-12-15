import { useEffect, useState } from 'react'
import './App.css'
import { fetchJsonData } from './services/getAPI'


function App() {
  const [flashCards, setFlashCards] = useState([])

  
  useEffect(() => {
    fetchJsonData('https://dummyjson.com/products').then((result) => {
      setFlashCards(result)
    })
  }, [])



  return (
    <div>
      Salam
    </div>
  )
}

export default App
