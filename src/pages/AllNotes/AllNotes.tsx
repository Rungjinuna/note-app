import React, { useState } from 'react';
import { ButtonOutline, Container, EmptyMsgBox } from '../../styles/styles';
import { useAppSelector } from '../../hooks/redux';
import { Box, InputBox, TopBox } from './AllNotes.styles';
import { useDispatch } from 'react-redux';
import { toggleFiltersModal } from '../../store/modal/modalSlice';
import getAllNotes from '../../utils/getAllNotes';

const AllNotes = () => {
  const { mainNotes } = useAppSelector((state) => state.notesList);
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  return (
    <Container>
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다</EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='노트의 제목을 입력해주세요'
              />
            </InputBox>
            <div className='notes__filter-btn'>
              <ButtonOutline
                className='nav__btn'
                onClick={() => dispatch(toggleFiltersModal(true))}
              >
                <span>정렬</span>
              </ButtonOutline>
            </div>
          </TopBox>
          <Box>{getAllNotes(mainNotes, filter)}</Box>
        </>
      )}
    </Container>
  );
};

export default AllNotes;
