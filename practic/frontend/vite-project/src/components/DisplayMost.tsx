import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function DisplayMost() {
    const [docName, setDocName] = useState('');
    const [docContent, setDocContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/displayMost', {
                    auth_name: localStorage.getItem("name"),
                });
                console.log(response.data);

                setDocName(response.data.temp.doc_name)
                setDocContent(response.data.temp.doc_contents)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


  return (
    <div>
        <div>
            Name: {docName}
        </div>
        <div>
            Content: {docContent}
        </div>
    </div>
  )
}

export default DisplayMost