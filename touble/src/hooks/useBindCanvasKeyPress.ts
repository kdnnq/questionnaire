import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  removeSelectedComponent,
  copySelectedComponet,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

//判断选中的是否合法(选中的是不是组件)
function isActiveElementValid() {
  const activeElem = document.activeElement;
  // 增加了 dnd-kit 以后
  if (activeElem === document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}
const useBindCanvasKeypress = () => {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponet());
  });
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });
  //   选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });
  //   选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true,
    },
  );
  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
};
export default useBindCanvasKeypress;
