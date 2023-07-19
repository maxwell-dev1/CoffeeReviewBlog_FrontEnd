// import Link from 'next/link'
 
const Navbar = () => {
  return (
    
    <div className='navLinks'>
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/testpage1">Test Page 1</a>
      </li>
      <li>
        <a href="/registration">New users: User Registration</a>
      </li>
      <li>
        <a href = "/coffeereviews">Coffee Reviews</a>
      </li>
    </ul>
    </div>
  )
}
 
export default Navbar;