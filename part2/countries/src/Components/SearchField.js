import React from "react";

const SearchField = ({countries, newSearch , handleSearchChange, handleSearchButton}) => {

    const filteredCountries = countries.filter(countries => countries.name.common.toLowerCase().includes(newSearch.toLowerCase()))
        
    if (filteredCountries.length === 1) 
        return (
            <div>
            <input value={newSearch} onChange={handleSearchChange} autoComplete='none'></input>
                {filteredCountries.map(countries => 
                <div style={{ listStyleType: "none" , padding: '0'}} key={countries.name.common} >
                <h2>{countries.name.common}</h2>
                Capital: {countries.capital}<br/>
                Continent: {countries.region}
                <h4>Languages</h4>
                <ul>{Object.entries(countries.languages).map(([, value]) => <li key={value}>{value}</li>
                )}</ul><br/>
                <img style={{ width:'50%'}} src={`${countries.flags.svg}`} alt={`flag of ${countries.name.common}`}/>
                </div>)}
            </div>
        )
    else if(filteredCountries.length >= 10 && newSearch !== '')
        return (
            <div>
            <input value={newSearch} onChange={handleSearchChange} autoComplete='none'></input>
            <p>Too many matches!!!</p>
            </div>
            
        )   
    else if(newSearch === '') return (
    <div> 
    <input value={newSearch} onChange={handleSearchChange} autoComplete='none'></input>
    </div>
     )
        else   
        return (
            <div>
            <input value={newSearch} onChange={handleSearchChange} autoComplete='none'></input>
            <ul style={{ listStyleType: "none" , padding: '0'}}>
            {filteredCountries.map(countries => 
            <li key={countries.name.common}>{countries.name.common}<button value={countries.name.common} onClick={handleSearchButton}>Show</button></li>
            )
            }
            </ul>
            </div>
        )

}

export default SearchField;