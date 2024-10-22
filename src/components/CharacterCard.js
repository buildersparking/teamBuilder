import React from 'react';

function CharacterCard({ character, onSelect, isSelected }) {
  return (
    <div 
      className={`character-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(character)}
      title={character.name}
    >
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h3>{character.name}</h3>
        {character.caracteristiques && (
          <p className="character-characteristics">{character.caracteristiques}</p>
        )}
        <p>DP: {character.dp}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
