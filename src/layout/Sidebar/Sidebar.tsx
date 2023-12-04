import React from 'react';
import { Container, ItemsBox, MainBox, StyledLogo } from './Sidebar.styles';
import { NavLink, useLocation } from 'react-router-dom';
import { FaArchive, FaLightbulb, FaTag, FaTrash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleMenu } from '../../store/menu/menuSlice';
import getStandardName from '../../utils/getStandardName';
import { toggleTagsModal } from '../../store/modal/modalSlice';
import { MdEdit } from 'react-icons/md';
import { v4 } from 'uuid';

const items = [
  { icon: <FaArchive />, title: 'Archive', id: v4() },
  { icon: <FaTrash />, title: 'Trash', id: v4() },
];

const Sidebar = () => {
  const { isOpen } = useAppSelector((state) => state.menu);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { tagsList } = useAppSelector((state) => state.tags);

  if (pathname === '/404') {
    return null;
  }

  return (
    <Container openMenu={isOpen ? 'open' : ''}>
      <MainBox openMenu={isOpen ? 'open' : ''}>
        <StyledLogo>
          <h1>Keep</h1>
        </StyledLogo>

        <ItemsBox>
          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            {/* to이하 경로로 라우팅, useLocation 훅을 사용하여 접근할때 전달해주는 state값 */}
            <NavLink
              to={'/'}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? 'active-item' : 'inactive-item'
              }
            >
              <span>
                <FaLightbulb />
              </span>
              <span>Notes</span>
            </NavLink>
          </li>

          {/* tags item */}
          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? 'active-item' : 'inactive-item'
                }
              >
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}
          <li
            className='sidebar__edit-item'
            onClick={() =>
              dispatch(toggleTagsModal({ type: 'edit', view: true }))
            }
          >
            <span>
              <MdEdit />
            </span>
            <span>Edit Notes</span>
          </li>

          {/* other items */}
          {items.map(({ icon, title, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLocaleLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) =>
                  isActive ? 'active-item' : 'inactive-item'
                }
              >
                <span>{icon}</span>
                <span>{title}</span>
              </NavLink>
            </li>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
