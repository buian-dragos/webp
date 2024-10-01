import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Document {
    doc_name: string;
    doc_contents: string;
}

interface Movie {
    movie_title: string;
    movie_duration: number;
}

type Item = 
  | { type: 'movie'; data: Movie }
  | { type: 'document'; data: Document };

function DisplayAll() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/displayAll', {
                    auth_name: localStorage.getItem("name"),
                });
                const { documents, movies } = response.data;

                const interleaved: Item[] = [];
                const maxLength = Math.max(documents.length, movies.length);

                for (let i = 0; i < maxLength; i++) {
                    if (i < documents.length) {
                        interleaved.push({ type: 'document', data: documents[i] });
                    }
                    if (i < movies.length) {
                        interleaved.push({ type: 'movie', data: movies[i] });
                    }
                }

                setItems(interleaved);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Display All</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.type === 'movie' ? (
                            <div>
                                <h2>Movie: {item.data.movie_title}</h2>
                                <p>{item.data.movie_duration}</p>
                            </div>
                        ) : (
                            <div>
                                <h2>Document: {item.data.doc_name}</h2>
                                <p>{item.data.doc_contents}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DisplayAll;
