import React, { ReactElement } from 'react'
import styled from 'styled-components'

export const ButtonStyle = styled.button<{
  textColor?: string
  backGroundColor?: string
  width?: string
}>`
  background: ${({ backGroundColor }) =>
    backGroundColor ? backGroundColor : '#444752'};
  color: ${({ textColor }) => (textColor ? textColor : 'white')};
  padding: 0.7rem;
  border-radius: 5px;
  border: none;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : 'auto')};
  cursor: pointer;
`
interface ButtonProps {
  children: React.ReactNode
  icon?: ReactElement<any, any>
  onClick?: () => void
  background?: string
  textColor?: string
  type?: 'button' | 'submit'
  width?: string
}
export const Button = ({
  children,
  onClick,
  icon,
  background,
  textColor,
  width,
  type = 'button',
}: ButtonProps) => {
  return (
    <ButtonStyle
      type={type}
      backGroundColor={background}
      onClick={onClick}
      textColor={textColor}
      width={width}
    >
      {icon}
      {children}
    </ButtonStyle>
  )
}
