import "./footer.scss"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className='footer'>
      <span>Dashboard Admin</span>
      <span> © Copyright Dashbord {year}</span>
    </div>
  )
}

export default Footer