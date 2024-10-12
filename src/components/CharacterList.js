import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import personnagesData from '../data/personnages.json';

function CharacterList({ onSelectCharacter, selectedCharacters }) {
  const [characters, setCharacters] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('nom');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dpFilter, setDpFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updatedCharacters = personnagesData.map(character => ({
      ...character,
      image: require(`../data/images/${character.image.split('/').pop()}`)
    }));
    setCharacters(updatedCharacters);
  }, []);

  const sortCharacters = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const handleDpFilterChange = (event) => {
    setDpFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAndSortedCharacters = characters
    .filter(character => 
      (dpFilter === 'all' || character.dp === parseInt(dpFilter)) &&
      character.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'nom') {
        return sortOrder === 'asc' 
          ? a.nom.localeCompare(b.nom) 
          : b.nom.localeCompare(a.nom);
      } else {
        return sortOrder === 'asc' 
          ? a.dp - b.dp 
          : b.dp - a.dp;
      }
    });

  const uniqueDpValues = [...new Set(characters.map(c => c.dp))].sort((a, b) => a - b);

  return (
    <div>
      <div className="filter-sort-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un personnage"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="sort-buttons">
          <button onClick={() => sortCharacters('nom')}>
            Trier par nom {sortCriteria === 'nom' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
          <button onClick={() => sortCharacters('dp')}>
            Trier par DP {sortCriteria === 'dp' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
        </div>
        <div className="dp-filter">
          <label htmlFor="dp-select">Filtrer par DP: </label>
          <select id="dp-select" value={dpFilter} onChange={handleDpFilterChange}>
            <option value="all">Tous</option>
            {uniqueDpValues.map(dp => (
              <option key={dp} value={dp}>{dp}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="character-list">
        {filteredAndSortedCharacters.map((character, index) => (
          <CharacterCard 
            key={index}
            character={character}
            onSelect={onSelectCharacter}
            isSelected={selectedCharacters.some(c => c.nom === character.nom)}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
