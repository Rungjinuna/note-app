import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../../types/note';
import notes from '../../notesData';

interface NoteState {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editNote: null | Note;
}

const initialState: NoteState = {
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editNote: null,
};

enum noteType {
  mainNotes = 'mainNotes',
  archiveNotes = 'archiveNotes',
  trashNotes = 'trashNotes',
}

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
    setMainNotes: (state, { payload }) => {
      //state.mainNotes 배열에서 payload.id와 일치하는 id가 있는지 확인
      //true이면 배열을 순회하면서 note의 id가 payload.id와 일치하면 해당요소를 payload로 업데이트. 아니면 note 반환
      //false이면 mainNotes배열에 payload를 추가함(push)
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) =>
          note.id === payload.id ? payload : note
        );
      } else {
        state.mainNotes.push(payload);
      }
    },
    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );

      state.trashNotes.push({ ...payload, isPinned: false });
    },
    //메인노트에서 메인노트와 id가 payload의 id가 다른것만 찾아서 배열로 반환
    //archiveNotes 배열에 payload의 속성들과 isPinned 속성 추가해서 업데이트
    setArchiveNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, isPinned: false });
    },
    unArchiveNote: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push(payload);
    },
    unarchiveNotes: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(
        ({ id }) => id !== payload.id
      );
      state.mainNotes.push(payload);
    },
    //trash에 버려진 노트를 다시 메인노트에 추가해주는 리듀서
    restoreNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    //trash에서 완전히 삭제하는 리듀서 . id값이 다른것들만 filter하여 배열 반환
    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },
    //note의 id가 payload.id와 일치할경우 전개연산자로 노트 객체 복사, isPinned의 속성값을 현재값의 반대로 설정한다.
    //note객체의 isPinned 속성의 논리적 반전
    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    setEditNote: (state, { payload }) => {
      state.editNote = payload;
    },

    //notes 유형에 따라 특정 노트의 isRead상태를 토글
    readNote: (state, { payload }) => {
      const { type, id } = payload;
      //특정 노트배열에 접근하여 note.id가 현재의 id와 같은지 확인
      //true이면 기존 노트 속성 복사하고 isRead 속성을 현재값의 반대로설정
      //현재 노트를 클릭해서 보고있으면 isRead : true
      const setRead = (notes: noteType) => {
        state[notes] = state[notes].map((note: Note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note
        );
      };
      //type에 따라 노트유형을 함수에 전달
      if (type === 'archive') {
        setRead(noteType.archiveNotes);
      } else if (type === 'trash') {
        setRead(noteType.trashNotes);
      } else {
        setRead(noteType.mainNotes);
      }
    },
  },
});

export const {
  setMainNotes,
  setTrashNotes,
  setArchiveNotes,
  unArchiveNote,
  restoreNote,
  deleteNote,
  setPinnedNotes,
  setEditNote,
  readNote,
  removeTags,
} = notesListSlice.actions;
export default notesListSlice.reducer;
