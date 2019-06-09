import React from 'react'

 function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white mt-2 p-3  text-center">

          copyright &copy; {new Date().getFullYear()} ProfileApp
      </footer>

    </div>
  )
}
export default Footer;