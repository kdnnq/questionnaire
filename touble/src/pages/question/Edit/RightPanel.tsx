import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import { useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const RightPanel = () => {
  const { selectedId } = useGetComponentInfo();

  // 当前激活的 Tab
  const [activeKey, setActiveKey] = useState('prop');
  //  记录上一次的 selectedId
  const [prevSelectedId, setPrevSelectedId] = useState(selectedId);

  // 在渲染过程中直接对比并更新状态
  if (selectedId !== prevSelectedId) {
    // 同步最新的 selectedId
    setPrevSelectedId(selectedId);
    // 根据 selectedId 的变化自动切换 Tab
    setActiveKey(selectedId ? 'prop' : 'setting');
  }

  const onChange = (key) => {
    setActiveKey(key);
  };

  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs items={tabsItems} activeKey={activeKey} onChange={onChange}></Tabs>;
};

export default RightPanel;
