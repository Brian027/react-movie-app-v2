import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.scss'

const headerNav = [
  {
    display: 'Accueil',
    path: '/'
  },
  {
    display: 'Films',
    path: '/movie'
  },
  {
    display: 'Series',
    path: '/tv'
  },
];

const Navbar = () => {

  const { pathname } = useLocation();

  const active = headerNav.findIndex(e => e.path === pathname);

  // Toggle search bar
  function clickSearch() {
    document.querySelector('#search').classList.toggle('active');
  }
  // Nav sticky function
  window.addEventListener('scroll', () => {
    let nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 0);
  });

  return (
    <nav>
      <button className='btnHamb'>
        <i className='bx bx-menu'></i>
      </button>
      <div className="logo">
        <h4>React Movies</h4>
      </div>
      <div className="rightContent">
        <ul className="nav-links">
          {
            headerNav.map((item, index) => (
              <li key={index} className={index === active ? 'active' : ''}>
                <Link to={item.path}>{item.display}</Link>
              </li>
            ))
          }
        </ul>
        <button className='search' onClick={clickSearch}>
              <i className='bx bx-search'></i>
        </button>
      </div>
      
      <input type="text" name="search" id="search" placeholder="ex: Avengers" />
    </nav>
  )
}

export default Navbar