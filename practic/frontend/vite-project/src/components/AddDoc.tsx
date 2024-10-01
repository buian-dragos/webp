import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddDoc() {
    const [docName, setDocName] = useState('');
    const [docContent, setDocContent] = useState('');
    const navigate = useNavigate();
    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:3000/addContent', {
                auth_name: localStorage.getItem("name"),
                docName: docName,
                docContents: docContent
            });

            if (response.status === 201) {
                console.log('Document added successfully:', response.data);
                navigate('/author')
            } else {
                console.error('Error adding document:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding document');
        }
    }

    return (
        <div>
            <input
                type="text"
                name="docName"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="Name"
                required
            />        
            <input
                type="text"
                name="docContent"
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                placeholder="Content"
                required
            />   
            <button onClick={handleAdd}>
                ADD
            </button>
        </div>
    )
}

export default AddDoc;
