import { Button, Typography, Space, Input, message } from 'antd';
import styles from './EditHeader.module.scss';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import type { FC } from 'react';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { updateQuestionService } from '../../../services/question';

const EditHeader = () => {
  // 显示和修改标题
  const TitleElem: FC = () => {
    const { title } = useGetPageInfo();
    const [editState, setEditState] = useState(false);
    if (editState) {
      return (
        <Input
          value={title}
          onPressEnter={() => {
            setEditState(false);
          }}
        ></Input>
      );
    }

    return (
      <Space>
        <Title>{title}</Title>
        <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)}></Button>
      </Space>
    );
  };

  // 保存
  const SaveButton: FC = () => {
    const { id } = useParams();
    const { componentList = [] } = useGetComponentInfo();
    const pageInfo = useGetPageInfo();

    const { loading, run: save } = useRequest(
      async () => {
        if (!id) return;
        await updateQuestionService(id, { ...pageInfo, componentList });
      },
      { manual: true },
    );
    // 快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
      event.preventDefault();
      if (!loading) save();
    });
    // 自动保存
    useDebounceEffect(
      () => {
        save();
      },
      [pageInfo, componentList],
      { wait: 1 },
    );

    return (
      <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
        保存
      </Button>
    );
  };

  // 发布按钮
  const PublishButton = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { componentList = [] } = useGetComponentInfo();
    const pageInfo = useGetPageInfo();

    const { loading, run: pub } = useRequest(
      async () => {
        if (!id) return;
        await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true });
      },
      {
        manual: true,
        onSuccess() {
          message.success('发布成功');
          nav('/question/stat/' + id);
        },
      },
    );
    return (
      <Button type="primary" onClick={pub} disabled={loading}>
        发布
      </Button>
    );
  };

  // 编辑器头部
  const nav = useNavigate();
  const { Title } = Typography;
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};
export default EditHeader;
