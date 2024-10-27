import React, { useState, useRef, useEffect } from 'react';

function CharacterCard({ character, onSelect, isSelected, isOpen, onToggleDetails, allCharacters }) {
  const detailsRef = useRef(null);
  const buttonRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && 
          detailsRef.current && 
          !detailsRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)) {
        onToggleDetails();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggleDetails]);

  useEffect(() => {
    if (isOpen && detailsRef.current && cardRef.current) {
      const detailsRect = detailsRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      let topPosition = '100%';
      let leftPosition = '50%';
      let transform = 'translateX(-50%)';

      if (detailsRect.bottom > windowHeight) {
        topPosition = 'auto';
        detailsRef.current.style.bottom = '100%';
      }

      if (detailsRect.right > windowWidth) {
        leftPosition = 'auto';
        detailsRef.current.style.right = '0';
        transform = 'none';
      } else if (detailsRect.left < 0) {
        leftPosition = '0';
        transform = 'none';
      }

      detailsRef.current.style.top = topPosition;
      detailsRef.current.style.left = leftPosition;
      detailsRef.current.style.transform = transform;
    }
  }, [isOpen]);

  const toggleDetails = (e) => {
    e.stopPropagation();
    onToggleDetails();
  };

  const getColorClass = (type) => {
    console.log(type);
    if (type=="ultimate") return 'ultimate-item';
    if (type=="neutral" || type=="up") return 'attack-item';
    return ''; 
  };

  const getSimilarCharacters = () => {
    return allCharacters.filter(c => 
      c.name === character.name && c.image !== character.image
    );
  };

  const similarCharacters = getSimilarCharacters();

  return (
    <div 
      className={`character-card ${isSelected ? 'selected' : ''} ${isOpen ? 'details-open' : ''}`}
      onClick={() => onSelect(character)}
      title={character.name}
      ref={cardRef}
    >
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h3>{character.name}</h3>
        {character.caracteristiques && (
          <p className="character-characteristics">{character.caracteristiques}</p>
        )}
        <p>DP: {character.dp}</p>
        <button 
          className="details-button" 
          onClick={toggleDetails}
          ref={buttonRef}
        >
          {isOpen ? 'Hide' : 'Details'}
        </button>
      </div>
      {isOpen && (
        <div 
          className="character-details-bubble" 
          onClick={(e) => e.stopPropagation()}
          ref={detailsRef}
        >
          <p className="details-section-title">Health Bars: {character["Health Bars"]}</p>
          <div className="skills-attacks-list">
            <p className="details-section-title">Skills:</p>
            {Object.entries(character.skills).map(([key, skill]) => (
              <div key={key} className={`skill-attack-item skill-item`}>
                {skill.name}
              </div>
            ))}

            {Object.entries(character.Attacks).map(([key, attack]) => (
              <div key={key} className={`skill-attack-item ${getColorClass(key)}`}>
                {attack.name}
              </div>
            ))}
          </div>
          {similarCharacters.length > 0 && (
            <div className="similar-characters">
              <p className="details-section-title">Transformations :</p>
              <div className="similar-characters-images">
                {similarCharacters.map((similarChar, index) => (
                  <div key={index} className="similar-character-item">
                    <img 
                      src={similarChar.image} 
                      alt={`${similarChar.name} ${similarChar.caracteristiques || ''}`}
                      title={`${similarChar.name} ${similarChar.caracteristiques || ''}`}
                      className="similar-character-image"
                    />
                    <p className="similar-character-characteristics">
                      {similarChar.caracteristiques || 'Base'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
