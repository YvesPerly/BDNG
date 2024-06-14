import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://localhost:5000/publications'); // Assurez-vous que le port correspond à votre serveur backend
        if (!response.ok) {
          throw new Error('Failed to fetch publications');
        }
        const data = await response.json();
        console.log('Data from server:', data); // Débogage : Vérifiez les données récupérées depuis le serveur
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Publications de la base de données DBLP</h1>
        <ul>
          {publications.map((pub) => (
            <li key={pub._id}>
              <h2>{pub.title}</h2>
              <p>Authors: {pub.authors.join(', ')}</p>
              <p>Year: {pub.year}</p>
              <p>Booktitle: {pub.booktitle}</p>
              <p>URL: {pub.url}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
