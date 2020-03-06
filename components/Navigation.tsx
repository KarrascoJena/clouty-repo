import Link from 'next/link';
import React from 'react';
import { styles } from '../constants/styles';
import { getCookieFromBrowser } from '../lib/session';

// const dev = process.env.NODE_ENV === 'development';

const Navigation = ({ user }: any) => {
  const isLoggedIn = getCookieFromBrowser('id_token') ? true : false;
  return (
    <nav className='mw8 center flex items-center mb5'>
      <Link href='/'>
        <a href='/' className='white flex-grow-1 no-underline'>
          <img
            width='40px'
            height='40px'
            src='/static/img/transparent_clouty-umbrella.png'
          />
        </a>
      </Link>
      <ul className='list pl0 flex mv0'>
        {isLoggedIn && (
          <li className='mr2 mr4-ns'>
            <Link href='/dashboard'>
              <a className={`${styles.navigationLink}`}>Admin</a>
            </Link>
          </li>
        )}
        <li className='mr2 mr4-ns'>
          <a href='/games' className={`${styles.navigationLink}`}>
            Games
          </a>
        </li>
        {isLoggedIn && (
          <li className='mr2 mr4-ns'>
            <a href='/user' className={`${styles.navigationLink}`}>
              {user ? user.info.firstName : 'Profile'}
            </a>
          </li>
        )}
        {!isLoggedIn && (
          <a href='/login' className={`${styles.navigationLink}`}>
            <li className='mr2 mr4-ns'>Sign-up/Login</li>
          </a>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
