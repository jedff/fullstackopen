import React from "react";

const Filter = ({newSearch, handleSearchChange}) => {
    return (
        <div>
        filter shown with: <input value={newSearch} onChange={handleSearchChange} autoComplete='none' />
       </div>
    )
}

export default Filter;