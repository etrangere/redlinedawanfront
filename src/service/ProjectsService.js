//for server2
//const BASE_URL = "https://portfolio.gourgen-khachatrian.fr:8444";
//->in package.json after version on top ->"homepage": "/68.redlinedawan",
//->basename in index.js -> <BrowserRouter basename="/68.redlinedawan">
//for dev
const BASE_URL = "http://localhost:8082";


export class ProjectsService {
  
  fetchData = async () => {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
     
    });
    const data = await response.json();
    console.log(data.JSON)
    return data;
  };

  fetchDataById = async (projectId) => {
    try {
      const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle error response here
        throw new Error('Failed to fetch project by ID');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle fetch or JSON parsing errors here
      console.error('Error fetching project by ID:', error);
      throw error;
    }
  };

  createData = async (newData) => {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    return data;
  };

  updateData = async (id, updatedData) => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  };

  deleteData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        // Handle error response here
        throw new Error('Failed to delete project');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle fetch or JSON parsing errors here
      console.error('Error deleting project:', error);
      throw error;
    }
  };
  
}
