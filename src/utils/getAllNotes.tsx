import React from 'react';
import { NotesContainer } from '../styles/styles';
import { NoteCard } from '../components';
import { Note } from '../types/note';

const getAllNotes = (mainNotes: Note[], filter: string) => {
  return (
    <>
      <div className='allNotes__notes-type'>All Notes</div>
      <NotesContainer>
        {mainNotes.map((note) => (
          <NoteCard key={note.id} note={note} type='notes' />
        ))}
      </NotesContainer>
    </>
  );
};

export default getAllNotes;
