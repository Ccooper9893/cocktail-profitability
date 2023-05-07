import cocktailIcon from '../../images/cocktailicon.png';

function Navbar() {
    return (
        <div className="navbar bg-black shadow-md shadow-black">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 w-52 bg-black">
              <li><a>Homepage</a></li>
              <li><a>Inventory</a></li>
              <li><a>Recipes</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img className='w-12' src={cocktailIcon} alt='cocktail icon'></img>
          <h1 className='text-xl'>Mixology Manager</h1>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost">
            <h2>Account</h2>
          </button>
        </div>
      </div>
    )
}

export default Navbar;