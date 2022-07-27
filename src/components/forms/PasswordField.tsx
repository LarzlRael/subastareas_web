import React from 'react'
import { Field } from 'formik'
import { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
interface PasswordFieldProps {
  name: string
  placeholder: string
}
export const PasswordField = ({ name, placeholder }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="form-login-container">
      <Field
        name={name}
        placeholder={placeholder}
        className="form-login__input-login"
        type={showPassword ? 'text' : 'password'}
      />
      {showPassword ? (
        <IoEye
          fontSize={30}
          color="var(--bg-color)"
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <IoEyeOff
          fontSize={30}
          color="var(--bg-color)"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  )
}
