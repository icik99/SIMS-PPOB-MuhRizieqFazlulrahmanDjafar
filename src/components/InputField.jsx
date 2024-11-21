import React from "react";

const InputField = ({
  type = "text",
  placeholder = "",
  value = "",
  name = "",
  disabled = false,
  onChange,
  onBlur,
  icon: Icon, 
  errorMessage, 
}) => {
  return (
    <div className="">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full outline-none ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-2 border-2 rounded `}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
        />
      </div>
      
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
