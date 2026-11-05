import { useState } from 'react';
import styles from './Common.module.scss';
import { useRequest, useTitle } from 'ahooks';
import { Typography, Empty, Tag, Table, Space, Button, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ListSearch } from '../../components/ListSearch';
import { UseLoadQuestionListData } from '../../hooks/useLoadQuestionListData';
import { updateQuestionService } from '../../services/question';
import { deleteQuestionService } from '../../services/question';

type QuestionType = {
  _id: string;
  title: string;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
};

export const Trash = () => {
  useTitle('小慕问卷-回收站');
  const { data = {}, loading, refresh } = UseLoadQuestionListData({ isDeleted: true });
  const { list = [] } = data as { list?: QuestionType[] };
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const { Title } = Typography;
  const { confirm } = Modal;

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ];
  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceMaxWait: 500,
      onSuccess() {
        refresh();
        setSelectIds([]);
      },
    },
  );
  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectIds);
    },
    {
      manual: true,
      onSuccess() {
        refresh();
        setSelectIds([]);
      },
    },
  );
  const TableElem = (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={selectIds.length === 0} onClick={recover}>
          恢复
        </Button>
        <Button type="primary" disabled={selectIds.length === 0} onClick={del}>
          删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  function del() {
    confirm({
      title: '确认是否彻底删除该问卷',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可找回',
      onOk: deleteQuestion,
    });
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}></div>
    </>
  );
};
