import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../../types/note';
import notes from '../../notesData';

interface NoteState {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNote: Note[];
  editNote: null | Note[];
}

const initialState: NoteState = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNote: [],
  editNote: null,
};

const notesListSlice = createSlice({
  name: 'notesList',
  initialState,
  reducers: {
    // 이미 노트에 할당된 태그 지우기
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
  },
});

export const { removeTags } = notesListSlice.actions;
export default notesListSlice.reducer;
