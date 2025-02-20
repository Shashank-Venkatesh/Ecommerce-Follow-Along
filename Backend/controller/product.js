/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Myproduct({ _id, name, images, description, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/create-product/${_id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v2/product/delete-product/${_id}`
            );
            if (response.status === 200) {
                alert("Product deleted successfully!");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <h2 className="text-lg font-bold">{name}</h2>
            <img
                src={images[currentIndex]}
                alt={name}
                className="w-full h-48 object-cover rounded-md mb-2"
            />
            <p className="text-sm text-gray-700">{description}</p>
            <p className="text-md font-semibold mt-2">${price}</p>

            <button
                onClick={handleEdit}
                className="w-full text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-400 transition duration-300 mt-4"
            >
                Edit
            </button>

            <button
                onClick={handleDelete}
                className="w-full text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-400 transition duration-300 mt-2"
            >
                Delete
            </button>
        </div>
    );
}

export default Myproduct;
