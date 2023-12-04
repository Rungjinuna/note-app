import React, { FC } from 'react';
import {
  Card,
  ContentBox,
  FooterBox,
  TagsBox,
  TopBox,
} from './NoteCard.styles';
import { NotesIconBox } from '../../styles/styles';
import { BsFillPinFill } from 'react-icons/bs';
import { Note } from '../../types/note';
import getRelevantBtns from '../../utils/getRelevantBtns';
import { readNote, setPinnedNotes } from '../../store/noteList/noteListSlice';
import { useAppDispatch } from '../../hooks/redux';
import { ReadNoteModal } from '..';
import HTMLReactParser from 'html-react-parser';

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard: FC<NoteCardProps> = ({ note, type }) => {
  const dispatch = useAppDispatch();
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;

  //이미지가 포함되어있다면 content그대로 반환
  const func = () => {
    const imgContent = content.includes('img');

    if (imgContent) {
      return content;
    } else {
      return content.length > 75 ? content.slice(0, 75) + '...' : content;
    }
  };

  return (
    <>
      {isRead && <ReadNoteModal type={type} note={note} />}
      <Card style={{ backgroundColor: color }}>
        <TopBox>
          <div className='noteCard__title'>
            {title.length > 10 ? title.slice(0, 10) + '...' : title}
          </div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>{priority}</span>
            {/* pin 기능 */}
            {type !== 'archive' && type !== 'trash' && (
              <NotesIconBox
                className='noteCard__pin'
                onClick={() => dispatch(setPinnedNotes({ id }))}
              >
                <BsFillPinFill style={{ color: isPinned ? 'red' : '' }} />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        {/* parse 함수를 사용하여 HTML 문자열을 React 컴포넌트로 변환 */}
        <ContentBox onClick={() => dispatch(readNote({ type, id }))}>
          {HTMLReactParser(func())}
        </ContentBox>
        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className='noteCard__date'>{date}</div>
          <div>{getRelevantBtns(type, note, dispatch)}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
