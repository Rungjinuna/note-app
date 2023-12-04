import styled from 'styled-components';

//<{ openMenu: string }>는 Container 컴포넌트가 openMenu라는 이름의 문자열 타입 prop을 받을 수 있음을 나타냄
//visibility와 background-color 속성은 openMenu prop의 값에 따라 다르게 적용
//openMenu가 'open'일 경우 visibility를 normal로, 그렇지 않으면 hidden으로 설정
export const Container = styled.nav<{ openMenu: string }>`
  @media screen and (max-width: 950px) {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    transition: 200ms visibility ease-in-out, 250ms background-color ease-in-out;
    visibility: ${({ openMenu }) =>
      openMenu === 'open' ? 'normal' : 'hidden'};
    background-color: ${({ openMenu }) =>
      openMenu === 'open' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)'};
    cursor: pointer;
  }
`;

export const MainBox = styled.div<{ openMenu: string }>`
  width: 250px;
  height: 100%;
  min-height: 100vh;
  background-color: #ecd5e3;

  @media screen and (max-width: 950px) {
    transition: 350ms transform ease-in-out;
    position: absolute;
    z-index: 10;
    transform: ${({ openMenu }) =>
      openMenu === 'open' ? 'translateX(0%)' : 'translateX(-100%)'};
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px 0px rgba(255, 255, 255, 0.3);
  img {
    margin-right: 10px;
  }
  span {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const ItemsBox = styled.ul`
  li {
    width: 100%;
    height: 60px;
    list-style: none;
    display: flex;
    align-items: center;
    font-weight: 500;

    cursor: pointer;

    svg {
      margin-right: 20px;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }

    .active-item {
      background-color: rgba(255, 255, 255, 0.18);
    }

    .inactive-item {
      transition: 250ms background-color ease-in-out,
        250ms border-left ease-in-out;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }

  .sidebar__edit-item {
    padding-left: 20px;
    transition: 250ms background-color ease-in-out,
      250ms border-left ease-in-out;
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;
