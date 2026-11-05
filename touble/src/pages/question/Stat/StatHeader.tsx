import { useMemo, type FC } from 'react';
import styles from './StatHeader.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, message, Popover, Space, Tooltip, Typography } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { QRCodeCanvas } from 'qrcode.react';

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();

  const url = `http://localhost:3000/question/${id}`;

  function copy() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success('拷贝成功');
      })
      .catch(() => {
        message.error('拷贝失败');
      });
  }

  const createQRCode = useMemo(() => {
    // const url = `http://localhost:3001/question/${id}`;
    if (!isPublished) return null;

    // 二维码
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeCanvas value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} readOnly />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id]);
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
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{createQRCode}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`);
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
