import { IconType } from 'react-icons'

export interface MessageProps {
  title: string
  boldWord: string
  subtitle: string
  icon: IconType
  success?: boolean
}
