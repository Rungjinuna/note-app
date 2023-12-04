import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFilterModal: boolean;
}

const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFilterModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleCreateNotModal: (state, action) => {
      state.viewCreateNoteModal = action.payload;
    },

    toggleFiltersModal: (state, action) => {
      state.viewFilterModal = action.payload;
    },

    toggleTagsModal: (state, action) => {
      const type = action.payload.type;
      const view = action.payload.view;

      if (type === 'add') {
        state.viewAddTagsModal = view;
      } else {
        state.viewEditTagsModal = view;
      }
    },
  },
});

export const { toggleCreateNotModal, toggleFiltersModal, toggleTagsModal } =
  modalSlice.actions;

export default modalSlice.reducer;
