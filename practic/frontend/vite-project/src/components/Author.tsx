import React from 'react'
import { useNavigate } from 'react-router-dom'


function Author() {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/addDoc')
    }

    const handleDisplayAll = () => {
        navigate('/displayAll')
    }

    const handleDisplayMost = () => {
        navigate('/displayMost')
    }

  return (
    <div>
        <button onClick={handleAdd}>
            ADD DOC
        </button>

        <button onClick={handleDisplayAll}>
            DISPLAY ALL
        </button>

        <button onClick={handleDisplayMost}>
            DISPLAY MOST AUTHORS
        </button>

        <button>
            DELETE MOVIE
        </button>

    </div>
  )
}

export default Author