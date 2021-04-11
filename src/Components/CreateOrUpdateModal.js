import 'antd/dist/antd.css';
import { Button, Input, Modal, Form, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

function DeleteModal(props) {
  const [visibleModal, setVisibleModal] = useState(props.visible);

  const onFinish = (values) => {
    if (props.create) {
      axios({
        method: 'post',
        url: `http://localhost:3012/user`,
        data: {
          name: values.name,
          email: values.email,
          status: values.status,
          gender: values.gender,
        }
      })
      message.success("User Success Fully Created!!");

    } else {
      axios({
        method: 'put',
        url: `http://localhost:3012/user/${values._id}`,
        data: {
          name: values.name,
          email: values.email,
          status: values.status,
          gender: values.gender,
        }
      })
      message.success("USer Successfully Updated!!");

    }

    handleCancel();
  }

  const handleCancel = () => {
    setVisibleModal(false);
    if (props.create) {
      props.setCreateUser(false);
    } else {
      props.setUpdateUser(false);
    }

  }

  return (
    <Modal
      visible={visibleModal}
      onCancel={handleCancel}
      title={props.title}
      footer={[]}
    >
      <Form name="User Details" onFinish={onFinish}>
        { !props.create ? <Form.Item name='_id' label='Id' rules={[{ required: true, message: 'Id is required' }]}>
          <Input placeholder="Enter User ID" />
        </Form.Item> : <></>}
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Name is required' }]}>
          <Input placeholder="Enter Name of User" />
        </Form.Item>
        <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Email is required' }]}>
          <Input placeholder="Enter Email of User" />
        </Form.Item>
        <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Gender is required' }]}>
          <Input placeholder="Enter Gender of User" />
        </Form.Item>
        <Form.Item name='status' label='Status' rules={[{ required: true, message: 'Status is required' }]}>
          <Input placeholder="Enter Status of User" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {props.create ? "Create User" : "Update User"}
        </Button>
      </Form>
    </Modal>

  );
}

export default DeleteModal;
