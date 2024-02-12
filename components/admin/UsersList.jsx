import { Table } from "antd";

const UsersList = ({ users }) => {

  const columns = [
    {
      title: 'Picture',
      key: 'image',
      dataIndex: 'image',
      render: (image) => (
        <>
          {image ?
            <img src={image} className="w-8 h-8 rounded-full" />
            :
            null
          }
        </>
      )
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role'
    }
  ]

  return (
    <div className="mt-5">
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default UsersList;
