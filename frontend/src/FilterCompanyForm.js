import { useState } from "react";

 function FilterCompanyForm(props) {

    const { onFilter, setFiltered, setSorted } = props
    const [name,setName]=useState('') 
    const [year, setYear] = useState('');

    const filter = (event) => {
        onFilter(
            name,
            year
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortNames = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div id="filtering-form">
            <hr></hr>
            <div>
                <div id="filtering-form-name">
                    <h2>Filter Companies</h2>
                    <label>Input the name of the company:</label> <br></br>
                    <input type='text' className="text-inputs" placeholder='Name' value={name} onChange={(evt) => setName(evt.target.value)}/>
                </div>
                <div id="filtering-form-year">
                    <label>Choose companies founded after the year:</label> <br></br>
                    <input type='number' className="text-inputs" placeholder='Year' value={year} onChange={(evt) => setYear(evt.target.value)} />
                </div>
                <div>
                    <div id="button-filter-container">
                        <input type='button' id="button-filter" className="button-style" value='Filter Results' onClick={filter}/>
                        <input type='button' id="button-clear-filter" className="button-style" value='Clear all filters' onClick={clearFilter} />
                    </div>
                    
                    <div id="sort-button-container">
                        <input type='button' id="button-sort" className="button-style" value='Sort alphabetically' onClick={sortNames} />
                    </div>
                    
                </div>
            </div>
        </div>
    )

 }

 export default FilterCompanyForm;