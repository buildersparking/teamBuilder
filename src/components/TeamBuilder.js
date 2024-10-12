import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';

function TeamBuilder() {
  const [team, setTeam] = useState([]);
  const [isOverDPLimit, setIsOverDPLimit] = useState(false);

  const handleSelectCharacter = (character) => {
    if (team.length < 5 && !team.some(c => c.nom === character.nom)) {
      setTeam([...team, character]);
    } else if (team.some(c => c.nom === character.nom)) {
      setTeam(team.filter(c => c.nom !== character.nom));
    }
  };

  const totalDP = team.reduce((sum, character) => sum + character.dp, 0);

  useEffect(() => {
    setIsOverDPLimit(totalDP > 15);
  }, [totalDP]);

  return (
    <div className="team-builder">
      <h1>Constructeur d'équipe Dragon Ball Sparking Zero</h1>
      <div className="selected-team">
        <h2>Équipe sélectionnée ({team.length}/5)</h2>
        <p className="total-dp">DP Total: {totalDP}</p>
        {isOverDPLimit && (
          <p className="warning-message">Attention : la limite de 15 DP est dépassée !</p>
        )}
        <div className="team-members">
          {team.map((character, index) => (
            <div key={index} className="team-member">
              <img src={character.image} alt={character.nom} className="team-member-image" />
              <span>{character.nom} (DP: {character.dp})</span>
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
