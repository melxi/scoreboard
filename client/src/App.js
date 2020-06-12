import React, { useEffect, useState } from 'react';
import ProgressRing from './components/ProgressRing';
import ModalForm from './components/ModalForm';

function App() {
  const [users, setUsers] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [arrow, setArrow] = useState('▼');
  const [modalOpen, setModalOpen] = useState(false)

  const handleSort = () => {
    if (sortOrder === 'asc') {
      setUsers([...users].sort((a, b) => a.score - b.score))
      setSortOrder('desc')
      setArrow('▲')
    } else if (sortOrder === 'desc') {
      setUsers([...users].sort((a, b) => b.score - a.score))
      setSortOrder('asc')
      setArrow('▼')
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      const request = await fetch('/api/users')
      const result = await request.json()
      const sorted = result.sort((a, b) => b.score - a.score).map((user, index) => {
        return Object.assign(user, { "rank": index + 1 })
      })
      setUsers(sorted)
    }

    fetchUsers()
  }, [modalOpen])

  return (
    <div className="App">
      <main className="leaderboard">
        <div className="container">
          <h1>Leaderboard</h1>
          <table className="table">
            <thead className="table_head">
              <tr className="table_titles">
                <th className="title title-rank">Rank</th>
                <th className="title title-user">User</th>
                <th className="title title-score" onClick={handleSort}>Score{arrow}</th>
                <th className="title title-country">Country</th>
                <th className="title title-date">Date</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {users.map((user, index) => (
                <tr className="table_values" key={user._id}>
                  <td className="value value-rank">{user.rank}</td>
                  <td className="value value-user">{user.username}</td>
                  <ProgressRing score={user.score}/>
                  <td className="value value-country">
                    {user.country}
                  </td>
                  <td className="value value-date">{new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setModalOpen(true)} className="button">Add new</button>
          {modalOpen && <ModalForm setModalOpen={setModalOpen}/>}
        </div>
      </main>
    </div>
  );
}

export default App;
