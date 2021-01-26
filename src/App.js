import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import axios from 'axios'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [input, setInput] = useState("")
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
      
      search(input)
      if (pageCount>=1){
        handlePage()  
      }
      //si el counter baja de 1 a 0 se resetea para que nunca quede en valor negativo
      if(pageCount<1){
        setPageCount(1)
      }
    
  }, [pageCount, input])

  

  const search = async (input) => {
   if (input && pageCount===1){
    setInput(input)
    axios.get(`http://www.omdbapi.com/?apikey=a461e386&s=${input}&page=${pageCount}`)
    .then((response)=>{
      setSearchResult(response.data.Search)
    })
  
   } 
  }

  const handlePage = () => {
      axios.get(`http://www.omdbapi.com/?apikey=a461e386&s=${input}&page=${pageCount}`)
        .then((response)=>{
          setSearchResult(response.data.Search)
        })
     }
  


  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search..." onChange={(e) => search(e.target.value)} />
        <button>Search</button>
      </div>
      {!searchResult ? (
        <p className="no-results">No results yet</p>
      ) : (
        <>
        <p className="page-counter">- {pageCount} -</p>
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft  onClick={()=> setPageCount(pageCount - 1)} />
          </div>
          
          <div className="search-results-list">
            
            {searchResult.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
            <ChevronRight onClick={()=> setPageCount(pageCount + 1)}/>
          </div>
        </div>
        
       </>
      )}
    </div>
  )
}

export default App


 