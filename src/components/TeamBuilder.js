import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';

function TeamBuilder() {
  const [team, setTeam] = useState([]);
  const [isOverDPLimit, setIsOverDPLimit] = useState(false);

  const handleSelectCharacter = (character) => {
    if (team.length < 5 && !team.some(c => c.name === character.name)) {
      setTeam([...team, character]);
    } else if (team.some(c => c.name === character.name)) {
      setTeam(team.filter(c => c.name !== character.name));
    }
  };

  const handleRemoveCharacter = (characterToRemove) => {
    setTeam(team.filter(character => character.name !== characterToRemove.name));
  };

  const totalDP = team.reduce((sum, character) => sum + character.dp, 0);

  useEffect(() => {
    setIsOverDPLimit(totalDP > 15);
  }, [totalDP]);

  return (
    <div className="team-builder">
     <h1>Dragon Ball Sparking! Zero Team Builder</h1>
      <div className="selected-team">
        <h2>Selected Team ({team.length}/5)</h2>
        <p className="total-dp">DP Total: {totalDP}</p>
        {isOverDPLimit && (
          <p className="warning-message">Warning : the 15 DP limit is exceeded !</p>
        )}
        <div className="team-members">
          {team.map((character, index) => (
            <div key={index} className="team-member">
              <button 
                className="remove-character" 
                onClick={() => handleRemoveCharacter(character)}
              >
                ×
              </button>
              <img src={character.image} alt={character.name} className="team-member-image" />
              <span>{character.name} (DP: {character.dp})</span>
            </div>
          ))}
        </div>
      </div>
      <CharacterList 
        onSelectCharacter={handleSelectCharacter}
        selectedCharacters={team}
      />
    </div>
  );
}

export default TeamBuilder;
