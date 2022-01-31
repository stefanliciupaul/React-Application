import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCompanyForm(props) {
    const { onAdd } = props 
    const [name, setName] = useState('');
    const [foundingDate, setFoundingDate] = useState(new Date());

    const add = (event) => {
        onAdd({
            name, 
            foundingDate
        })
        setName('');
    }

    return (
        <div id="adding-form">
            <h2 id="add-company-name">Add a Company</h2>
            <div id="adding-rows">
                <label>Input the company name:</label>
                <br></br>
                <input type='text' className="text-inputs" placeholder='Company Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <div>
                    <label>Founding Date:</label>

                    <DatePicker selected={foundingDate} onChange={date => setFoundingDate(date)} />
                </div>
                <div>
                    <input type='button' className="button-style" value='Add the company' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddCompanyForm;
