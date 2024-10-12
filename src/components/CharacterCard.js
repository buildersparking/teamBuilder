import React from 'react';

function CharacterCard({ character, onSelect, isSelected }) {
  return (
    <div 
      className={`character-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(character)}
      title={character.nom} // Ajoute un tooltip avec le nom complet
    >
      <img src={character.image} alt={character.nom} className="character-image" />
      <div className="character-info">
        <h3>{character.nom}</h3>
        <p>DP: {character.dp}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
