import React, { useState, useEffect, useCallback } from 'react';
import CharacterCard from './CharacterCard';
import personnagesData from '../data/personnages.json';

function CharacterList({ onSelectCharacter, selectedCharacters }) {
  const [characters, setCharacters] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dpFilter, setDpFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openCharacterDetails, setOpenCharacterDetails] = useState(null);

  useEffect(() => {
    const updatedCharacters = personnagesData.map(character => ({
      ...character,
      image: `${process.env.PUBLIC_URL}/images/${character.image.split('/').pop()}`
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
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc' 
          ? a.dp - b.dp 
          : b.dp - a.dp;
      }
    });

  const uniqueDpValues = [...new Set(characters.map(c => c.dp))].sort((a, b) => a - b);

  const getCharacterIdentifier = (character) => {
    return `${character.name}-${character.caracteristiques || ''}`;
  };

  return (
    <div>
      <div className="filter-sort-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a character"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="sort-buttons">
          <button onClick={() => sortCharacters('name')}>
            Sort by name {sortCriteria === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
          <button onClick={() => sortCharacters('dp')}>
            Sort by DP {sortCriteria === 'dp' && (sortOrder === 'asc' ? '▲' : '▼')}
          </button>
        </div>
        <div className="dp-filter">
          <label htmlFor="dp-select">Filter by DP: </label>
          <select id="dp-select" value={dpFilter} onChange={handleDpFilterChange}>
            <option value="all">All</option>
            {uniqueDpValues.map(dp => (
              <option key={dp} value={dp}>{dp}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="character-list">
        {filteredAndSortedCharacters.map((character) => (
          <CharacterCard 
            key={getCharacterIdentifier(character)}
            character={character}
            onSelect={onSelectCharacter}
            isSelected={selectedCharacters.some(c => c.name === character.name)}
            isOpen={openCharacterDetails === getCharacterIdentifier(character)}
            onToggleDetails={() => {
              const identifier = getCharacterIdentifier(character);
              setOpenCharacterDetails(openCharacterDetails === identifier ? null : identifier);
            }}
            allCharacters={characters}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
