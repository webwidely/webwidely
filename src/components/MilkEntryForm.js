import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const MilkEntryForm = () => {
  const [qty, setQty] = useState(2);
  const [price, setPrice] = useState(320);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('https://pay.webwidely.com/wp-json/jet-cct/milk_entry');
      setEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BheS53ZWJ3aWRlbHkuY29tIiwiaWF0IjoxNjg4ODc3MzMxLCJuYmYiOjE2ODg4NzczMzEsImV4cCI6MTY4OTQ4MjEzMSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.dBbgTXbopQyifucco1K4r3gldJqb3TYReNo4n3PtUmA';

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      qty,
      price,
      date,
    };

    try {
      await axios.post('https://pay.webwidely.com/wp-json/jet-cct/milk_entry', data, { headers });
      fetchEntries();
      setQty(2);
      setPrice(320);
      setDate(new Date().toISOString().split('T')[0]);
      setMessage('Entry added successfully');
    } catch (error) {
      console.error(error);
      setMessage('Failed to add entry');
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setSelectedId(id);
  };

  const confirmDeleteEntry = async () => {
    try {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BheS53ZWJ3aWRlbHkuY29tIiwiaWF0IjoxNjg4ODg0NDM3LCJuYmYiOjE2ODg4ODQ0MzcsImV4cCI6MTY4OTQ4OTIzNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.i30wkUBCZ9cz2ZmdhmPbfUyvtDwwCbdiKUVGpKZglIo';
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(`https://pay.webwidely.com/wp-json/jet-cct/milk_entry/${selectedId}`, { headers });
      fetchEntries();
      setConfirmDelete(false);
      setMessage('Entry deleted successfully');
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete entry');
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setSelectedId('');
  };

  const calculateTotal = () => {
    const totalQty = entries.reduce((sum, entry) => sum + parseInt(entry.qty), 0);
    const totalPrice = entries.reduce((sum, entry) => sum + parseInt(entry.price), 0);
    return { totalQty, totalPrice };
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-md">
      <h1 className="text-3xl font-bold text-center text-green-500 mb-4">Milk Entry Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <label className="block mb-2" htmlFor="qty">
            Quantity:
          </label>
          <input
            type="text"
            id="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <label className="block mb-2" htmlFor="price">
            Price:
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <label className="block mb-2" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
          />
        </div>
        <div className="w-full px-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 w-full"
          >
            Submit
          </button>
        </div>
      </form>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const formattedDate = new Date(parseInt(entry.date) * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <tr key={entry._ID}>
                <td className="px-4 py-2 text-center">{entry.qty}</td>
                <td className="px-4 py-2 text-center">{entry.price}</td>
                <td className="px-4 py-2 text-center">{formattedDate}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(entry._ID)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-green-500 text-white">
            <td className="px-4 py-2 text-center">{calculateTotal().totalQty}</td>
            <td className="px-4 py-2 " colSpan="2">
              <strong>Total Price: </strong>
              {calculateTotal().totalPrice}
            </td>
            <td className="px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-4">
            <p>Are you sure you want to delete this entry?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmDeleteEntry}
                className="bg-red-500 text-white rounded-md px-4 py-2 mr-2"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white rounded-md px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="fixed bottom-0 right-0 bg-green-500 text-white px-4 py-2 m-4 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default MilkEntryForm;
