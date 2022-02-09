import React from "react";

const PersonForm = ({addnewName,newName,newNumber,handlenNameChange,handlenNumberChange}) => {
    
return(
    <div>
    <form onSubmit={addnewName}>
        <div>
            name: <input value={newName} onChange={handlenNameChange} autoComplete='none'/><br />
            number: <input value={newNumber} onChange={handlenNumberChange} autoComplete='none'/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
  </form>
  </div>
  )
}

export default PersonForm