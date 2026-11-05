import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Input, type InputRef } from 'antd';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
  type ComponentInfoType,
} from '../../../store/componentsReducer';
import styles from './Layers.module.scss';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';

const Layers = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  const [editingId, setEditingId] = useState<string>('');
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  // 选中组件时自动进入编辑状态（渲染阶段调整，避免 effect 中同步 setState）
  const [prevSelectedId, setPrevSelectedId] = useState('');
  if (selectedId !== prevSelectedId) {
    setPrevSelectedId(selectedId);
    if (selectedId) {
      const comp = componentList.find((c) => c.fe_id === selectedId);
      if (comp) {
        setEditingId(selectedId);
        setEditValue(comp.title);
      }
    } else {
      setEditingId('');
    }
  }

  // 选中组件
  function handleSelect(fe_id: string) {
    dispatch(changeSelectedId(fe_id));
  }

  // 保存标题
  function handleSaveTitle(fe_id: string) {
    const value = editValue.trim();
    if (value) {
      dispatch(changeComponentTitle({ fe_id, title: value }));
    } else {
      // 为空时恢复原标题
      const comp = componentList.find((c) => c.fe_id === fe_id);
      if (comp) setEditValue(comp.title);
    }
    setEditingId('');
  }

  // 切换隐藏/显示
  function handleToggleHidden(c: ComponentInfoType) {
    const { fe_id, isHidden } = c;
    dispatch(changeComponentHidden({ fe_id, isHidden: !isHidden }));
  }

  // 切换锁定/解锁
  function handleToggleLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结果
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.layers}>
        {componentList.map((c) => {
          const { fe_id, title, isHidden, isLocked } = c;
          const isSelected = fe_id === selectedId;
          const isEditing = fe_id === editingId;
          const itemClassName = classnames({
            [styles.item]: true,
            [styles.selected]: isSelected,
            [styles.hidden]: isHidden,
          });
          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div key={fe_id} className={itemClassName} onClick={() => handleSelect(fe_id)}>
                <div className={styles.title}>
                  {isEditing ? (
                    <Input
                      ref={inputRef}
                      value={editValue}
                      size="small"
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveTitle(fe_id)}
                      onPressEnter={() => handleSaveTitle(fe_id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => {
                        setEditingId(fe_id);
                        setEditValue(title);
                      }}
                    >
                      {title}
                    </span>
                  )}
                </div>
                <div className={styles.actions}>
                  <span
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleHidden(c);
                    }}
                  >
                    {isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </span>
                  <span
                    className={styles.iconBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLocked(fe_id);
                    }}
                  >
                    {isLocked ? <LockOutlined /> : <UnlockOutlined />}
                  </span>
                </div>
              </div>
            </SortableItem>
          );
        })}
      </div>
    </SortableContainer>
  );
};

export default Layers;
