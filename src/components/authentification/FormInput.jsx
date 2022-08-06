import { useState } from "react";
import "./form-input.scss";

const FormInput = (props) => {
const [focused, setFocused] = useState(false);
const { label, errorMessage, onChange, id, ...inputProps } = props;

const handleFocus = (e) => {
    setFocused(true);
};

return (
    <div className="formInput">
    <label className="labelAuth">{label}</label>
    <input className="inputAuth"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
        inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
    />
    <span className="spanAuth">{errorMessage}</span>
    </div>
);
};

export default FormInput;