import { useState, type FC } from 'react';
import { Space, Button, Divider, Tag, Popconfirm, Modal } from 'antd';
import styles from './QuestionCard.module.scss';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuestionService } from '../services/question';
import { duplicateQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

type propsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
export const QuestionCard: FC<propsType> = (props: propsType) => {
  const { _id, title, isPublished, answerCount, createAt, isStar } = props;
  const nav = useNavigate();
  const { confirm } = Modal;
  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
      },
    },
  );

  // 复制

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${(result as { id: string }).id || result._id}`);
      },
    },
  );
  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deletedLoading, run: deletedQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true);
      },
    },
  );
  function del() {
    confirm({
      title: '确认删除吗',
      icon: <ExclamationCircleOutlined />,
      onOk: deletedQuestion,
    });
  }
  if (isDeletedState) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {isStarState && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷：{answerCount}</span>
              <span>{createAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={() => {
                  nav(`/question/edit/${_id}`);
                }}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                size="small"
                onClick={() => {
                  nav(`/question/stat/${_id}`);
                }}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取消标星' : '标星'}
              </Button>
              <Popconfirm
                title="确认复制该问卷吗"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
                disabled={duplicateLoading}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
                disabled={deletedLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
