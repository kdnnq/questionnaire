import { useEffect, useState, type FC } from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getComponentStatService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import {
  statComponentLoaders,
  type ComponentStatPropsType,
} from '../../../components/QuestionComponents';

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams();
  const { Title } = Typography;
  const [stat, setStat] = useState<ComponentStatPropsType['stat'] | undefined>(undefined);
  const { selectedComponentId, selectedComponentType } = props;
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat((res as { stat: ComponentStatPropsType['stat'] }).stat);
      },
    },
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  // 动态加载统计图表组件（recharts 等重依赖只在统计页使用时才下载）
  const [StatComponent, setStatComponent] = useState<FC<ComponentStatPropsType> | null>(null);
  const [prevType, setPrevType] = useState('');
  if (selectedComponentType !== prevType) {
    setPrevType(selectedComponentType);
    if (statComponentLoaders[selectedComponentType] == null) {
      setStatComponent(null);
    }
  }
  useEffect(() => {
    let cancelled = false;
    const loader = statComponentLoaders[selectedComponentType];
    if (loader == null) return;
    loader().then((module) => {
      if (!cancelled) setStatComponent(() => module.default);
    });
    return () => {
      cancelled = true;
    };
  }, [selectedComponentType]);

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>;
    if (StatComponent == null) return <div>该组件无统计图表</div>;
    return <StatComponent stat={stat ?? []} />;
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </>
  );
};
export default ChartStat;
