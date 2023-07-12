import { useEffect, useState } from 'react';

const Table = () => {
  const [datas, setDatas] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/app/rou');
        const data = await response.json();
        setDatas(data);
      } catch (error) {
        console.log(`El error es ${error}`);
      }
    };
    fetchData()
  }, [editData]);
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/app/rou/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      setDatas(datas.filter((data) => data._id !== id));
    } catch (error) {
      console.log(`El error es ${error}`);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/app/rou/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      const updatedData = await response.json();
      console.log(updatedData);

      setDatas(
        datas.map((item) => (item._id === updatedData._id ? updatedData : item))
      );

      setEditData(null);
      setIsEditing(false);
    } catch (error) {
      console.log(`El error es ${error}`);
    }
  };
  const handleCancelEdit = () => {
    setEditData(null);
    setIsEditing(false);
  };
  return (
    <div className='mt-20 flex'>
      <table className='w-2/3 m-auto '>
        <thead className='bg-red-500   '>
          <tr className=''>
            <th className='border-2 border-black'>Nombre</th>
            <th className='border-2 border-black'>Apellido</th>
            <th className='border-2 border-black'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data._id}>
              {isEditing && editData?._id === data._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                    />
                  </td>
                  <td className='grid grid-cols-2'>
                    <button className='bg-green-600 rounded-lg' onClick={handleUpdate}>Guardar</button>
                    <button className='bg-red-500 rounded-lg' onClick={handleCancelEdit}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td className='grid grid-cols-2'>
                    <button className='bg-yellow-500 w-full rounded-lg' onClick={() => handleEdit(data)}>Editar</button>
                  <button className='bg-red-500 w-full rounded-lg' onClick={() => handleDelete(data._id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
