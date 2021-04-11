import 'antd/dist/antd.css';
import { Input, message, Modal } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const { Search } = Input;

function DeleteModal(props) {
  const [visibleModal, setVisibleModal] = useState(props.visible);
  
  const onSearch = (value) => {
    axios.delete(`http://localhost:3012/user/${value}`);
    message.warning("User Successfully Deleted");
    handleCancel();
  }

  const handleCancel = () => {
    setVisibleModal(false);
    props.setDeleteUser(false);
  }

  return (
    <Modal
      visible={visibleModal}
      onCancel={handleCancel}
      title={props.title}
      footer={[]}
    >
      <Search
        placeholder="Enter User ID"
        allowClear
        enterButton="Delete"
        size="large"
        onSearch={onSearch}
      />
    </Modal>

  );
}

export default DeleteModal;
