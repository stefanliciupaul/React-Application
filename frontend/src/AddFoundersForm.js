import { useState } from "react";

function AddFoundersForm(props) {
    const { onAdd, companyId } = props 
    const [name, setName] = useState('');
    const [role, setRole] = useState('CEO');

    const add = (event) => {
        onAdd(
            name, 
            role,
            companyId
        )
        setName('');
        setRole('CEO')
    }

    return (
        <div>
            <hr></hr>
            <div>
                <label>Input the founder's name:</label> <br></br>
                <input type='text' className="text-inputs" placeholder='Founder Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <div>
                    <label>Choose the role of the founder:</label> <br></br>
                    <select id="role-select" className="text-inputs" value={role} onChange={(evt) => setRole(evt.target.value)}>
                        <option value="CEO">Chief Executive Officer</option>
                        <option value="CTO">Chief Technology Officer</option>
                        <option value="CFO">Chief Financial Officer</option>
                        <option value="CMO">Chief Marketing Officer</option>
                    </select>
                </div>
                <div>
                    <input type='button' className="button-style" value='Add the founder' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddFoundersForm;
