import React, { useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { postAction } from '../services/action'
import { getParam, successResponse } from '../utils/utils'
import * as Yup from 'yup'
import { LayoutForm } from '../components/layout/LayoutForm'
import { Button } from '../components/buttons/Button'

import { useNavigate } from 'react-router-dom'
import { MessageProps } from '../components/interfaces/interfaces'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { useVerifyToken } from '../hooks/useVerifyToken'
import { useState } from 'react'
import { CircularLoading } from '../components/loadings/'

export const Confirm = () => {
  useVerifyToken()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (getParam('token')) {
      localStorage.setItem('token', getParam('token') || '')
    } else {
      navigate('/success', {
        state: {
          title: 'Hubo',
          boldWord: 'error',
          subtitle: 'Vuelva a intentarlo',
          success: false,
        },
      })
    }
  }, [])

  async function onSubmit(values: initialValuesI) {
    setLoading(true)
    try {
      const res = await postAction({
        url: '/verifyUser',
        data: values,
      })
      success(res)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  function success(res: any) {
    if (successResponse.includes(res.status)) {
      navigate('/success', {
        state: {
          title: 'Tu cuenta se activo',
          boldWord: 'satisfactoriamente',
          subtitle: 'Ahora puedes cerrar esta ventana e iniciar sesión',
          success: true,
        },
      })
      localStorage.removeItem('token')
    }
  }
  interface initialValuesI {
    name: string
    lastName: string
    nickName: string
  }
  const initialValues = {
    name: '',
    lastName: '',
    nickName: '',
  }
  const ConfirmSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    lastName: Yup.string().required('Campo requerido'),
    nickName: Yup.string().required('Campo requerido'),
  })
  return (
    <LayoutForm
      title="Confirmar registro"
      subtitle="Rellene los campos por favor"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={ConfirmSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="ChangePassword__input-container">
              <Field
                name="name"
                placeholder="Nombre"
                className="form-login__input-login"
              />
              {errors.name && (
                <div className="error_message">{errors.name}</div>
              )}
              <Field
                name="lastName"
                placeholder="Apellido"
                className="form-login__input-login"
              />
              {errors.lastName && (
                <div className="error_message">{errors.lastName}</div>
              )}
              <Field
                name="nickName"
                placeholder="Apodo"
                className="form-login__input-login"
              />
              {errors.nickName && (
                <div className="error_message">{errors.nickName}</div>
              )}
              {loading ? (
                <CircularLoading />
              ) : (
                <Button background="var(--bg-color)" type="submit" width="100%">
                  Estoy deacuerdo
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </LayoutForm>
  )
}
