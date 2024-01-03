import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [rows, setRows] = useState(() => {
    // Initialize state with data from localStorage or an empty array
    const savedRows = JSON.parse(localStorage.getItem('list')) || [];
    return savedRows;
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Save data to localStorage whenever rows change
    localStorage.setItem('list', JSON.stringify(rows));
  }, [rows]);

  const handleAddRow = () => {
    if (inputValue.trim() !== '') {
      const newRow = {
        id: Date.now(),
        content: inputValue,
        completed: false,
      };

      setRows((prevRows) => [...prevRows, newRow]);
      setInputValue('');
    }
  };

  const handleDeleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleToggleComplete = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, completed: !row.completed } : row
      )
    );
  };

  return (
    <div className="container-fluid text-center align-items-center">
      <div className="title mt-6 text-white">
        <h1>Make Your Plan</h1>
      </div>

      <form className="inputField" onSubmit={(e) => e.preventDefault()}>
        <div className="container custom-background text-white">
          <div className="mb-2 w-100" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              placeholder="Enter to-do"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRow();
                }
              }}
            />
            <button
              onClick={handleAddRow}
              style={{ position: 'absolute', right: 0, top: 0 }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <br />
          
          <table className="table custom-rounded-table table-hover">
            <thead>
              <tr>
                <th>To-do</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    textDecoration: row.completed ? 'line-through' : 'none',
                    textDecorationColor: row.completed ? 'black' : 'initial',
                  }}
                  onClick={() => handleToggleComplete(row.id)}
                >
                  <td>{row.content}</td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#b9de00' }} />
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default App;




// const [rows, setRows] = useState([]);
// const [inputValue, setInputValue] = useState('');

// useEffect(() => {
//   // Fetch data from the API when the component mounts
//   fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
//     setRows(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// const handleAddRow = async () => {
//   if (inputValue.trim() !== '') {
//     try {
//       const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
//         title: inputValue,
//         completed: false,
//       });

//       setRows((prevRows) => [...prevRows, response.data]);
//       setInputValue('');
//     } catch (error) {
//       console.error('Error adding row:', error);
//     }
//   }
// };

// const handleDeleteRow = async (id) => {
//   try {
//     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
//     setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//   } catch (error) {
//     console.error('Error deleting row:', error);
//   }
// };

// const handleToggleComplete = async (id) => {
//   try {
//     const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//       completed: true,
//     });

//     setRows((prevRows) =>
//       prevRows.map((row) => (row.id === id ? response.data : row))
//     );
//   } catch (error) {
//     console.error('Error toggling complete:', error);
//   }
// };
