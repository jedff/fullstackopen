import React from "react"

const Numbers = ({persons, newSearch, handleDelete}) => {
  persons = persons.filter(p => p !== null)
    return (
        <div>
        {persons
        .filter(persons => persons.name.toLowerCase().includes(newSearch.toLowerCase()))
        .map(persons => <p key={persons.name}>
                          {persons.name}: {persons.number}
                          <button data-id={persons.id} data-name={persons.name} onClick={handleDelete}>Delete</button></p>)
        }
        </div>
    )
  }
export default Numbers