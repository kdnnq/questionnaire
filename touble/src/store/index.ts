import { configureStore } from '@reduxjs/toolkit';
import userReducer, { type UserStateType } from './userReducer';
import componentsReducer, { type ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { type PageInfoType } from './pageInfoReducer';
import undoable, { excludeAction, type StateWithHistory } from 'redux-undo';

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    // 增加了undo
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/restComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
});
