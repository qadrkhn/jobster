const FormRow = ({ name, value, type, labelText, handleChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={ name }className="form-label">
                { name }
            </label>
            <input 
                className="form-input"
                type={ type } 
                name={ name }
                value={ value }
                onChange={ handleChange }
            />
        </div>
    );
};

export default FormRow;