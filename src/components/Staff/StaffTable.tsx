import React, { useState } from 'react';
import { Button, Table,Tag,Popconfirm } from 'antd';
import { EditOutlined,DeleteOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  Key: React.Key;
  FullName: string;
  Gender: number;
  tags: string[]; 
  Level:string;
  Email:string;
  PhoneNumber:string;
  Actions:any;
}

interface IProps{
  dataStaffList?:any,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'Key',
  },
  {
    title: 'Full Name',
    dataIndex: 'FullName',
  },
  {
    title: 'Gender',
    dataIndex: 'Gender',
  },
  {
    title: 'Phone Number',
    dataIndex: 'PhoneNumber',
  },
  {
    title: 'Email',
    dataIndex: 'Email',
  },
  {
    title: 'Role',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Coach') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Level',
    dataIndex: 'Level',
  },
  {
    title: 'Actions',
    dataIndex: 'Actions',
  },
];



const TableUser: React.FC<IProps> = ({dataStaffList}) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [id, setid] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = (id:string) => {
    setid(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setid("");
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setid("");
  };

  const data: DataType[] = [];
  for (let i = 0; i < dataStaffList?.length; i++) {
  data.push({
    Key: i + 1,
    FullName: dataStaffList[i].FullName,
    Email:dataStaffList[i].Email,
    PhoneNumber:dataStaffList[i].PhoneNumber,
    Gender: dataStaffList[i].Gender,
    tags: [dataStaffList[i].Role],
    Level:dataStaffList[i].coaches.Level,
    Actions:(
      <div className='flex gap-2'>
          <Button className='bg-green-500 text-white hover:text-white'><EditOutlined /></Button>
          <Popconfirm
            title="Title"
            description="Open Popconfirm with async logic"
            open={id.includes(dataStaffList[i].id)}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
              <Button className='bg-red-500 text-white' onClick={()=>showPopconfirm(dataStaffList[i].id)}><DeleteOutlined/></Button>
          </Popconfirm>
      </div>
    )
  });
  }
  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div> */}
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default TableUser;