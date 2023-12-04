import { Note } from '../types/note';
import { NotesIconBox } from '../styles/styles';
import { RiInboxUnarchiveFill } from 'react-icons/ri';
import { Dispatch } from '@reduxjs/toolkit';
import {
  deleteNote,
  restoreNote,
  setArchiveNotes,
  setEditNote,
  setTrashNotes,
  unArchiveNote,
} from '../store/noteList/noteListSlice';
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa';
import { toggleCreateNoteModal } from '../store/modal/modalSlice';

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {
  const clickHandler = () => {
    dispatch(toggleCreateNoteModal(true));
    dispatch(setEditNote(note));
  };

  if (type === 'archive') {
    return (
      <>
        {/* data-* 속성 : 개발자가 표준HTML요소에 추가정보를 저장할 수 있게 해준다. */}
        <NotesIconBox
          onClick={() => dispatch(unArchiveNote(note))}
          data-info='Unarchive'
        >
          <RiInboxUnarchiveFill style={{ fontSize: '1rem' }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else if (type === 'trash') {
    return (
      <>
        <NotesIconBox
          onClick={() => dispatch(restoreNote(note))}
          data-info='Restore'
        >
          <FaTrashRestore style={{ fontSize: '1rem' }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(deleteNote(note))}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        <NotesIconBox onClick={clickHandler} data-info='Edit'>
          <FaEdit style={{ fontSize: '1rem' }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setArchiveNotes(note))}
          data-info='Archive'
        >
          <FaTrashRestore style={{ fontSize: '1rem' }} />
        </NotesIconBox>
        <NotesIconBox
          onClick={() => dispatch(setTrashNotes(note))}
          data-info='Delete'
        >
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default getRelevantBtns;
