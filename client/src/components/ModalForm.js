import React, { useState } from 'react'

const ModalForm = (props) => {
    const countries = ['Austria', 'Belgium', 'France', 'Finland', 'Germany', 'Italy', 'Norway', 'Spain', 'Sweden', 'United Kingdom']
    const [username, setUsername] = useState('')
    const [score, setScore] = useState('')
    const [country, setCountry] = useState(countries[0])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, score, country})
        })

        props.setModalOpen(false)
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required value={username} onChange={({ target }) => setUsername(target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="score">Score</label>
                        <input type="number" id="score" name="score" min="0" max="100" required value={score} onChange={({ target }) => setScore(target.value)}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="country">Contry</label>
                        <select id="country" name="country" onChange={({target}) => setCountry(target.value)}>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="button-group">
                        <button className="btn btn-cancel" onClick={(e) => {props.setModalOpen(false)}}>Cancel</button>
                        <button type="submit" className="btn btn-submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalForm
