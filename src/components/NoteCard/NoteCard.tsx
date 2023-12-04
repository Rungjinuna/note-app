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

interface NoteCardProps {
  note: Note;
  type: string;
}

const NoteCard: FC<NoteCardProps> = ({ note, type }) => {
  const { title, content, tags, color, priority, date, isPinned, isRead, id } =
    note;
  return (
    <>
      <Card style={{ backgroundColor: color }}>
        <TopBox>
          <div className='noteCard__title'>
            {title.length > 10 ? title.slice(0, 10) + '...' : title}
          </div>
          <div className='noteCard__top-options'>
            <span className='noteCard__priority'>{priority}</span>
            {type !== 'archive' && type !== 'trash' && (
              <NotesIconBox className='noteCard__pin'>
                <BsFillPinFill style={{ color: isPinned ? 'red' : '' }} />
              </NotesIconBox>
            )}
          </div>
        </TopBox>
        <ContentBox>{content}</ContentBox>
        <TagsBox>
          {tags?.map(({ tag, id }) => (
            <span key={id}>{tag}</span>
          ))}
        </TagsBox>
        <FooterBox>
          <div className='noteCard__date'>{date}</div>
        </FooterBox>
      </Card>
    </>
  );
};

export default NoteCard;
