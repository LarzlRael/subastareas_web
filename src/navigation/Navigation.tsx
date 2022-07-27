import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Confirm } from '../pages/'
import { ChangePassword } from '../pages/ChangePassword'
import { SuccessfulMessage } from '../components/layout/SuccessfulMessage'

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/completeregister" element={<Confirm />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/success" element={<SuccessfulMessage />} />
      </Routes>
    </BrowserRouter>
  )
}
