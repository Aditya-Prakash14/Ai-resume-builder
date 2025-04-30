import { createContext, useContext,  Dispatch } from 'react';
import { Resume } from '@/lib/types';



 field; value: Resume[keyof Resume] }
  | { type: 'SET_SAVING'; value: boolean }
  | { type: 'SET_DELETING'; value: boolean }
  | { type: 'SET_HAS_CHANGES'; value;

const ResumeContext = createContext(null);

function resumeReducer(state, action){
  switch (action.type) {
    case 'UPDATE_FIELD'= {
        ...state,
        resume: {
          ...state.resume,
          [action.field]: action.value
        }
      };
      return newState;


      
    case 'SET_SAVING':
      // console.log('Resume Editor Context - Saving State:', action.value);
      return { ...state, isSaving: action.value };
    case 'SET_DELETING':
      // console.log('Resume Editor Context - Deleting State:', action.value);
      return { ...state, isDeleting: action.value };
    case 'SET_HAS_CHANGES':
      // console.log('Resume Editor Context - Unsaved Changes:', action.value);
      return { ...state, hasUnsavedChanges: action.value };
    default;
  }
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}

export { ResumeContext, resumeReducer }; 