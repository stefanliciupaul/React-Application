function FoundersDetails(props) {

    const { item, onDeleteFounder } = props;

    const deleteFounder = () => {
        onDeleteFounder(item.id, item.companyId)
    }

    return (
        <div>
            <div>
                Founder: {item.name}  with the position: <span >{item.role} </span>
                <input type='button' className="button-style" value='delete' onClick={deleteFounder} />
            </div>
            <div id="button-delete-founder">
                
            </div>
        </div>
    );
}

export default FoundersDetails;