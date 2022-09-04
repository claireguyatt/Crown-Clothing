import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    // weird stuff in label is just to make the label shrink when user goes to input
    return (
        <div className="group">
            <input className="form-input" {...otherProps}/>
            {label && (
            <label 
                className={`${
                otherProps.value.length ? 'shrink' : ''
                } form-input-label`}
            >
                {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;