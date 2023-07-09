import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MilkEntryForm = () => {
  const [qty, setQty] = useState(2);
  const [price, setPrice] = useState(160);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState([]);

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
      setPrice(160);
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    const totalQty = entries.reduce((sum, entry) => sum + parseInt(entry.qty), 0);
    const totalPrice = entries.reduce((sum, entry) => sum + parseInt(entry.price), 0);
    return { totalQty, totalPrice };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Milk Entry Form</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2" htmlFor="qty">
              Quantity:
            </label>
            <input type="text" id="qty" value={qty} onChange={(e) => setQty(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 w-full" />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2" htmlFor="price">
              Price:
            </label>
            <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 w-full" />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block mb-2" htmlFor="date">
              Date:
            </label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 w-full" />
          </div>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 mt-2">Submit</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Entries</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-2">{entry.qty}</td>
              <td className="px-4 py-2">{entry.price}</td>
              <td className="px-4 py-2">{entry.date}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-green-500 text-white">
            <td className="px-4 py-2">{calculateTotal().totalQty}</td>
            <td className="px-4 py-2">{calculateTotal().totalPrice}</td>
            <td className="px-4 py-2">Total</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MilkEntryForm;