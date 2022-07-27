interface layoutForm {
  title: string
  subtitle: string
  children: React.ReactNode
}
export const LayoutForm = ({ title, subtitle, children }: layoutForm) => {
  return (
    <div className="ChangePassword">
      <h3 className="ChangePassword__login-title">{title}</h3>

      <div className="ChangePassword__form-container">
        <h3 className="ChangePassword__login-title ChangePassword__login-title--blue">
          {subtitle}
        </h3>
        {children}
      </div>
    </div>
  )
}
