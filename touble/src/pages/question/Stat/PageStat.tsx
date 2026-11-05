import { useState, type FC } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import { Spin, Typography, Table, Pagination } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE } from '../../../constant';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { id = '' } = useParams();
  const { Title } = Typography;
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    },
  );

  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((c) => {
    const { fe_id, title, props = {}, type } = c;
    const colTitle = props!.title || title;

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <div style={{ color: selectedComponentId === fe_id ? '#91bde6' : 'inherit' }}>
            {colTitle}
          </div>
        </div>
      ),
      dataIndex: fe_id,
    };
  });
  const TableElem = (
    <>
      <Table columns={columns} dataSource={list} pagination={false} rowKey="_id" />
      <div style={{ marginTop: '18px' }}>
        <Pagination
          align="center"
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};
export default PageStat;
