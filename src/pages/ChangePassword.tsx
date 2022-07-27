import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { postAction } from '../services/action'
import { getParam, successResponse } from '../utils/utils'
import * as Yup from 'yup'
import { Button } from '../components/buttons/Button'
import { LayoutForm } from '../components/layout/LayoutForm'
import { useNavigate } from 'react-router-dom'
import { useVerifyToken } from '../hooks/useVerifyToken'
import { CircularLoading } from '../components/loadings/'
import { PasswordField } from '../components/forms/PasswordField'

export const ChangePassword = () => {
  useVerifyToken()
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem('token', getParam('token') || '')
  }, [])

  async function onSubmit(values: initialValuesI) {
    setLoading(true)
    try {
      const res = await postAction({
        url: '/changePassword',
        data: values,
        method: 'POST',
      })
      success(res)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  interface initialValuesI {
    password: string
    passwordConfirm: string
  }
  const initialValues = {
    password: '',
    passwordConfirm: '',
  }
  const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(50, 'Too Long!')
      .required('Campo requerido'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las constraseñas no coinciden')
      .required('Campo requerido'),
  })

  function success(res: any) {
    if (successResponse.includes(res.status)) {
      navigate('/success', {
        state: {
          title: 'Contraseña cambiada ',
          boldWord: 'correctamente',
          subtitle:
            'Ahora puedes cerrar esta ventana e iniciar sesión con tu nueva contraseña',
          success: true,
        },
      })
      localStorage.removeItem('token')
    }
  }
  return (
    <LayoutForm title="Restablecer contraseña" subtitle="Cambiar contraseña">
      <Formik
        initialValues={initialValues}
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="ChangePassword__input-container">
              {/*  <Field
                name="password"
                type="password"
                placeholder="Contraseña"
                className="form-login__input-login"
              /> */}
              <PasswordField
                name="password"
                placeholder="Contraseña"
              />
              {errors.password && touched.password ? (
                <div className="error_message">{errors.password}</div>
              ) : null}
              <PasswordField
                name="passwordConfirm"
                placeholder="Repetir contraseña Contraseña"
              />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className="error_message">{errors.passwordConfirm}</div>
              ) : null}
              {loading ? (
                <CircularLoading />
              ) : (
                <Button type="submit" background="var(--bg-color)" width="100%">
                  Cambiar contraseña
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </LayoutForm>
  )
}
