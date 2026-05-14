import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const WorkoutSetup = () => {
    const [gymMachines, setGymMachines] = useState([]);
    const [newMachine, setNewMachine] = useState({ name: '', image: '', category: '', branch: '' });
    const [editMachine, setEditMachine] = useState(null);

    useEffect(() => {
        fetchGymMachines();
    }, []);

    const fetchGymMachines = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/gym-machines/');
            setGymMachines(response.data);
        } catch (error) {
            console.error("There was an error fetching the gym machines!", error);
        }
    };

    const handleAddMachine = async () => {
        try {
            await axios.post('http://localhost:8000/api/gym-machines/post', newMachine);
            fetchGymMachines();
            setNewMachine({ name: '', image: '', category: '', branch: '' });
        } catch (error) {
            console.error("There was an error adding the gym machine!", error);
        }
    };

    const handleEditMachine = async () => {
        try {
            await axios.put(`http://localhost:8000/api/gym-machines/put/${editMachine._id}`, editMachine);
            fetchGymMachines();
            setEditMachine(null);
        } catch (error) {
            console.error("There was an error updating the gym machine!", error);
        }
    };

    const handleDeleteMachine = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/gym-machines/delete/${id}`);
            fetchGymMachines();
        } catch (error) {
            console.error("There was an error deleting the gym machine!", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Gym Machines</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gymMachines.map(machine => (
                    <li key={machine._id} className="bg-white shadow-lg rounded-lg p-4">
                        <img src={machine.image} alt={machine.name} className="w-full h-48 object-cover rounded" />
                        <div className="mt-2">
                            <p className="text-xl font-semibold">{machine.name}</p>
                            <p className="text-gray-600">{machine.category}</p>
                            <p className="text-gray-600">{machine.branch}</p>
                            <div className="flex justify-end mt-2 space-x-2">
                                <button 
                                    className="text-blue-500 hover:text-blue-700" 
                                    onClick={() => setEditMachine(machine)}
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    className="text-red-500 hover:text-red-700" 
                                    onClick={() => handleDeleteMachine(machine._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Add New Machine</h2>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
                <div className="mb-2">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={newMachine.name} 
                        onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })} 
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <input 
                        type="text" 
                        placeholder="Image URL" 
                        value={newMachine.image} 
                        onChange={(e) => setNewMachine({ ...newMachine, image: e.target.value })} 
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <input 
                        type="text" 
                        placeholder="Category" 
                        value={newMachine.category} 
                        onChange={(e) => setNewMachine({ ...newMachine, category: e.target.value })} 
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <input 
                        type="text" 
                        placeholder="Branch" 
                        value={newMachine.branch} 
                        onChange={(e) => setNewMachine({ ...newMachine, branch: e.target.value })} 
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button 
                    onClick={handleAddMachine} 
                    className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    <FaPlus className="mr-2" /> Add Machine
                </button>
            </div>

            {editMachine && (
                <div className="bg-white shadow-lg rounded-lg p-4 mt-8">
                    <h2 className="text-2xl font-bold mb-4">Edit Machine</h2>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={editMachine.name} 
                            onChange={(e) => setEditMachine({ ...editMachine, name: e.target.value })} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            placeholder="Image URL" 
                            value={editMachine.image} 
                            onChange={(e) => setEditMachine({ ...editMachine, image: e.target.value })} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            placeholder="Category" 
                            value={editMachine.category} 
                            onChange={(e) => setEditMachine({ ...editMachine, category: e.target.value })} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            placeholder="Branch" 
                            value={editMachine.branch} 
                            onChange={(e) => setEditMachine({ ...editMachine, branch: e.target.value })} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button 
                            onClick={handleEditMachine} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                        <button 
                            onClick={() => setEditMachine(null)} 
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
