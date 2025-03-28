import { useField } from "formik";
import React, { useState, useEffect } from "react";

interface TextInputProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  name?: string; // Bisa optional
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  defaultValue,
  prefix,
  suffix,
  name,
}) => {
  // State untuk menangani defaultValue (hanya diambil saat pertama kali render)
  const [inputValue, setInputValue] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  // Jika `name` ada, gunakan Formik
  const [formikField, meta, helpers] = useField(name || "_");

  // Tentukan field yang digunakan
  const field = name
    ? {
        ...formikField,
        value: formikField.value || inputValue, // Pakai defaultValue jika belum ada di Formik
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          helpers.setValue(e.target.value); // Update Formik value
          setInputValue(e.target.value); // Update local state
        },
      }
    : {
        value: value ?? inputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e);
          setInputValue(e.target.value);
        },
      };

  return (
    <div className="w-full">
      <div className="relative flex items-center w-full">
        {prefix && <div className="absolute left-3 text-gray-500">{prefix}</div>}
        <input
          {...field}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-primary-100 transition-all duration-300 ${
            meta?.touched && meta?.error ? "border-red-500 focus:ring-red-500" : "border-support-100/30 focus:ring-blue-500"
          }`}
          style={{
            paddingLeft: prefix ? "2.5rem" : undefined,
            paddingRight: suffix ? "2.5rem" : undefined,
          }}
        />
        {suffix && <div className="absolute right-3 text-gray-500">{suffix}</div>}
      </div>
      {name && meta?.touched && meta?.error && <p className="text-red-500 text-sm mt-1">{meta.error}</p>}
    </div>
  );
};

export default TextInput;
