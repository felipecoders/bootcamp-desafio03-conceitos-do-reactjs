import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function load() {
      const { data } = await api.get('/repositories')

      setRepositories(data)
    }

    load()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `bootcamp-gostack-desafios ${Date.now()}`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: [
        'Node.js',
        'Reactjs',
        'React-Native'
      ]
    })

    const repository = response.data

    setRepositories(repositories => [...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories => 
      repositories.filter(repository => repository.id !== id)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
