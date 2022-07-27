import './SuccessfulMessage.css'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { MessageProps } from '../interfaces/interfaces'

export const SuccessfulMessage = () => {
  const location = useLocation()
  const state = location.state as MessageProps

  return (
    <div className="SuccessfulMessage">
      <div className="SuccessfulMessage__content">
        {state.success ? (
          <IoCheckmarkCircleOutline size={140} color="#33AC51" />
        ) : (
          <IoCloseCircleOutline size={140} color="#FF0000" />
        )}
        <h3 className="SuccessfulMessage__title">
          {state.title}{' '}
          <b
            style={{
              color: state.success ? '#33AC51' : '#FF0000',
            }}
          >
            {/* satisfactoriamente */}
            {state.boldWord}
          </b>
        </h3>
        <span className="SuccessfulMessage__subtitle">{state.subtitle}</span>
      </div>
    </div>
  )
}
