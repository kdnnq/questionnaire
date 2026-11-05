import { componentConfGroup, type ComponentConfType } from '../../../components/QuestionComponents';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { addComponent } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';

const Lib = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  const handleClick = useCallback((c: ComponentConfType) => {
    const { title, type, defaultProps } = c;
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      }),
    );
  }, []);
  function genComponent(c: ComponentConfType) {
    const { type, Component } = c;

    return (
      <div key={type} className={styles.wrapper} onClick={() => handleClick(c)}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    );
  }
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};
export default Lib;
