import React, { useEffect, useState } from 'react';
import { ProjectsService } from '../service/ProjectsService.js';
import './ModalMenu.css';

export default function MyComponent() {
  const [projects, setProjects] = useState([]);
  const [newData, setNewData] = useState({
    name: '',
    progress_rate: '',
    status: '',
    dead_line: '',
    url_remote_repository: '',
    first_saving_date_time: '',
    last_update_date_time: '',
    version: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const projectsService = new ProjectsService();

    const fetchData = async () => {
      const data = await projectsService.fetchData();
      setProjects(data);
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const projectsService = new ProjectsService();
    // Create new data
    const result = await projectsService.createData(newData);
    setProjects((prevData) => [...prevData, result]);
    setNewData({
      name: '',
      progress_rate: '',
      status: '',
      dead_line: '',
      url_remote_repository: '',
      first_saving_date_time: '',
      last_update_date_time: '',
      version: '',
    });
    setShowCreateForm(false);
  };

  const handleUpdate = async (id) => {
    const projectsService = new ProjectsService();
    // Find the item being edited
    const itemToUpdate = projects.find((item) => item.id === id);
    // Update data
    const result = await projectsService.updateData(id, newData);
    setProjects((prevData) =>
      prevData.map((item) => (item.id === id ? result : item))
    );
    setEditingId(null); // Reset editing state
  };

  const handleDelete = async (id) => {
    const projectsService = new ProjectsService();
    // Delete data
    await projectsService.deleteData(id);
    setProjects((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const itemToEdit = projects.find((item) => item.id === id);
    setNewData({ ...itemToEdit });
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prevValue) => !prevValue);
  };

  return (
    <div>
 {/* Create form */}
 <h1>Create Project</h1>
      {showCreateForm ? (
        <form>
          {/* Add input fields for each required field */}
          <label>Name:</label>
          <input
            type="text"
            value={newData.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          />
          <label>Progress Rate:</label>
          <input
            type="text"
            value={newData.progress_rate}
            onChange={(e) => setNewData({ ...newData, progress_rate: e.target.value })}
          />
          <label>Status:</label>
          <input
            type="text"
            value={newData.status}
            onChange={(e) => setNewData({ ...newData, status: e.target.value })}
          />
            <label>Deadline:</label>
          <input
            type="text"
            value={newData.dead_line}
            onChange={(e) => setNewData({ ...newData, dead_line: e.target.value })}
          />
          <label>URL Remote Repository</label>
          <input
            type="text"
            value={newData.url_remote_repository}
            onChange={(e) => setNewData({ ...newData, url_remote_repository: e.target.value })}
          />
          

          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </form>
      ) : (
        <button onClick={toggleCreateForm}>Add</button>
      )}
      {/* table with projects */}
      <table className='hometable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Progress Rate</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>URL Remote Repository</th>
            <th>First Saving Date/Time</th>
            <th>Last Update Date/Time</th>
            <th>Version</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.name}
                  onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                />
              ) : item.name}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.progress_rate}
                  onChange={(e) => setNewData({ ...newData, progress_rate: e.target.value })}
                />
              ) : item.progress_rate}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.status}
                  onChange={(e) => setNewData({ ...newData, status: e.target.value })}
                />
              ) : item.status}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.dead_line}
                  onChange={(e) => setNewData({ ...newData, dead_line: e.target.value })}
                />
              ) : item.dead_line}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.url_remote_repository}
                  onChange={(e) =>
                    setNewData({ ...newData, url_remote_repository: e.target.value })
                  }
                />
              ) : item.url_remote_repository}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.first_saving_date_time}
                  onChange={(e) =>
                    setNewData({ ...newData, first_saving_date_time: e.target.value })
                  }
                />
              ) : item.first_saving_date_time}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.last_update_date_time}
                  onChange={(e) =>
                    setNewData({ ...newData, last_update_date_time: e.target.value })
                  }
                />
              ) : item.last_update_date_time}</td>
              <td>{editingId === item.id ? (
                <input
                  type="text"
                  value={newData.version}
                  onChange={(e) => setNewData({ ...newData, version: e.target.value })}
                />
              ) : item.version}</td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => handleUpdate(item.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
}
