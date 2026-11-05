import type { ComponentInfoType, ComponentsStateType } from './index';

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return '';
  // 重新计算selectedId
  let newSelectedId: string;
  const length = visibleComponentList.length;
  if (length <= 1) {
    // 组件就一个删除了就没有了
    newSelectedId = '';
  } else {
    // 组件长度大于1
    if (index + 1 === length) {
      //删除最后一个就选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      // 删除的不是最后一个就选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
}
