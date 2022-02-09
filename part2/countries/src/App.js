import React, { useEffect, useState } from "react";
import SearchField from "./Components/SearchField";
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState ([])
  const [newSearch, setNewSearch] = useState('')

  useEffect (() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchButton = (event) => {
    setNewSearch(event.target.value)
}
  
  return (
    <div>
      <h1>Countries</h1>
      find countries: 
      <SearchField countries={countries} newSearch={newSearch} handleSearchChange={handleSearchChange} handleSearchButton={handleSearchButton}></SearchField>
     </div>
  );
}

export default App;
