import './App.css';
import 'antd/dist/antd.css';
import { Button, Card, message } from 'antd';
import { useState } from 'react';
import CreateOrUpdateModal from './Components/CreateOrUpdateModal';
import DeleteModal from './Components/DeleteModal';
import * as axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [createUser, setCreateUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const handleGet = async () => {
    const response = await axios.get('http://localhost:3012/users');
    setUsers(response.data);
  }

  const handleCreate = () => {
    setUpdateUser(false);
    setDeleteUser(false);
    setCreateUser(true);
  }

  const handleUpdate = () => {
    setCreateUser(false);
    setDeleteUser(false);
    setUpdateUser(true);
  }

  const handleDelete = () => {
    setUpdateUser(false);
    setCreateUser(false);
    setDeleteUser(true);
  }

  const handleCreateCSV = () => {
    setUpdateUser(false);
    setDeleteUser(false);
    setCreateUser(false);
    axios({
      method:'get',
      url: `http://localhost:3012/create`,
    })
    message.success('CSV Successfully Created');
  }

  return (
    <div className="App">
      <div>
        <h1>Tensor Go User Api's</h1>
      </div>
      <div className='content'>
        <div >
          <Button type='primary' onClick={handleGet}>View All Users</Button>
        </div>
        <div>
          <Button type='primary' onClick={handleCreate}>Create User</Button>
          {createUser ? <CreateOrUpdateModal visible={createUser} title="Create User" create={true} setCreateUser={setCreateUser}></CreateOrUpdateModal> : <></>}
        </div>
        <div>
          <Button type='primary' onClick={handleUpdate}>Update User</Button>
          {updateUser ? <CreateOrUpdateModal visible={updateUser} title="Update User" create={false} setUpdateUser={setUpdateUser}></CreateOrUpdateModal> : <></>}
        </div>
        <div>
          <Button type='primary' onClick={handleDelete}>Delete User</Button>
          {deleteUser ? <DeleteModal visible={deleteUser} title="Delete User" setDeleteUser={setDeleteUser} ></DeleteModal> : <></>}
        </div>
        <div>
        <Button type='primary' onClick={handleCreateCSV}>Create CSV</Button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around',flexWrap: 'wrap' }}>
        {
          users.map((user) => {
            return (
              <div style={{width:'30%'}}>
                <Card title={user.name} bordered={false} style={{width:'300px', padding: '10px'}}>
                  <p>ID:{user._id}</p>
                  <p>Email:{user.email}</p>
                  <p>Gender:{user.gender}</p>
                  <p>Status:{user.status}</p>
                </Card>
            </div>)
          })
        }
      </div>
    </div>
  );
}

export default App;
