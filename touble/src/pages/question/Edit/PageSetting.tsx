import { Input, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { changePageInfo, type PageInfoType } from '../../../store/pageInfoReducer';
import styles from './PageSetting.module.scss';
import useGetPageInfo from '../../../hooks/useGetPageInfo';

const { TextArea } = Input;
const { Title } = Typography;

const PageSetting = () => {
  const dispatch = useDispatch();
  const pageInfo = useGetPageInfo();
  const { title, desc, css, js } = pageInfo;

  function handleChange(field: keyof PageInfoType, value: string) {
    dispatch(changePageInfo({ [field]: value }));
  }

  return (
    <div className={styles.setting}>
      <div className={styles.item}>
        <Title level={5} className={styles.label}>
          页面标题
        </Title>
        <Input
          value={title}
          placeholder="请输入页面标题"
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className={styles.item}>
        <Title level={5} className={styles.label}>
          页面描述
        </Title>
        <TextArea
          value={desc}
          placeholder="请输入页面描述"
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={(e) => handleChange('desc', e.target.value)}
        />
      </div>

      <div className={styles.item}>
        <Title level={5} className={styles.label}>
          样式代码
        </Title>
        <TextArea
          value={css}
          placeholder="输入 CSS 代码..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          className={styles.codeArea}
          onChange={(e) => handleChange('css', e.target.value)}
        />
      </div>

      <div className={styles.item}>
        <Title level={5} className={styles.label}>
          脚本代码
        </Title>
        <TextArea
          value={js}
          placeholder="输入 JS 代码..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          className={styles.codeArea}
          onChange={(e) => handleChange('js', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PageSetting;
