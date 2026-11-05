import { useDispatch } from 'react-redux';
import {
  getComponentConfByType,
  type ComponentPropsType,
} from '../../../components/QuestionComponents';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { changeComponentProps } from '../../../store/componentsReducer';

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props, isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;
  const { PropComponent } = componentConf;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />;
};
export default ComponentProp;
