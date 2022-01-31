import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Company(props) {

    const { item, onSave, onDelete, setSelectedCompany } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [foundingDate, setFoundingDate] = useState(new Date(item.foundingDate));

    const seeFounders = (event) => {
        setSelectedCompany(item);
    }

    const deleteCompany = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveCompany = () => {
        onSave( item.id, {
            name, 
            foundingDate
        })
        setIsEditing(false);
    }
    return (
        <div>
            {
                isEditing ? (
                    <>
                        Editing selected field
                        <div>
                            <input type='text' placeholder='Company Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                            <div>
                                <label>Founding Date:</label>

                                <DatePicker selected={foundingDate} onChange={date => setFoundingDate(date)} />
                            </div>
                        </div>
                        <input type='button' className="button-style" value='Cancel Editing' onClick={cancel} />
                        <input type='button' className="button-style" value='Save Changes' onClick={saveCompany} />
                    </>
                ) :
                    (
                        <>
                            <div>
                                Company: {item.name}, founded on the date: {item.foundingDate}
                            </div>
                            <div>
                                <input type='button' className="button-style" value='Delete' onClick={deleteCompany} />
                                <input type='button' className="button-style" value='Edit' onClick={edit} />
                                <input type='button' className="button-style" value='See Founders' onClick={seeFounders} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Company