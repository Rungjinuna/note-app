import React from 'react';
import { Container, StyledNav } from './Navbar.styles';
import { FiMenu } from 'react-icons/fi';
import { useAppDispatch } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import { ButtonFill } from '../../styles/styles';
import getStandardName from '../../utils/getStandardName';
import { useLocation } from 'react-router-dom';
import { toggleCreateNotModal } from '../../store/modal/modalSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  //useLocation 페이지간의 이동 및 URL관리 도와줌
  const location = useLocation();
  //useLocation 객체의 속성들 (state, pathname)
  //pathname은 URL 경로부분
  const { state, pathname } = location;
  console.log(state);

  if (pathname === '/404') {
    return null;
  }

  return (
    <StyledNav>
      <div className='nav__menu'>
        <FiMenu onClick={() => dispatch(toggleMenu(true))} />
      </div>

      <Container>
        <div className='nav__page-title'>{getStandardName(state)}</div>

        {state !== 'Trash' && state !== 'Archive' && (
          <ButtonFill
            onClick={() => dispatch(toggleCreateNotModal(true))}
            className='nav__btn'
          >
            <span>+</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
};

export default Navbar;
