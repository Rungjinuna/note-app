import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types/tag';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

interface TagState {
  tagsList: Tag[];
}
//v4는 uuid를 무작위로 생성하는 함수
//uuid는 고유식별자
const initialState: TagState = {
  tagsList: [
    { tag: 'Learnings', id: v4() },
    { tag: 'work', id: v4() },
    { tag: 'Quotes', id: v4() },
  ],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTags: (state, { payload }) => {
      if (state.tagsList.find(({ tag }) => tag === payload.tag)) {
        toast.warning('이미 존재하는 태그입니다.');
      } else {
        state.tagsList.push(payload);
        toast.info('새로운 태그가 등록되었습니다.');
      }
    },

    deleteTags: (state, { payload }) => {
      state.tagsList = state.tagsList.filter(({ id }) => id !== payload);
      toast.info('태그가 삭제되었습니다.');
    },
  },
});
export const { addTags, deleteTags } = tagsSlice.actions;

export default tagsSlice.reducer;
