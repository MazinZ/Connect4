import React from 'react';
import './styles/InfoPanel.css';

const InfoPanel = (props) => {
  const { data } = props;
  const inactive = data.ended;
  return (
    <div className="info-card">
      <div className="info-container">
        { inactive ? (
          <h1> A Player disconnected. </h1>
        ) : (
          <div className="active">
            <h1> {data.room} </h1>
            {data.isTurn && data.active && data.start && !data.spectator
             && <p className="description"> Your turn </p>
            }
            {!data.isTurn && data.active && data.start && !data.spectator
             && <p className="description"> Other player&#39;s turn </p>
            }
            <br />
            <p> {data.spectators} Spectator(s) watching</p>
            {data.win
              && <p> Player {data.colors[data.win].name} wins! </p>
            }
            {data.draw
              && <p> Draw! </p>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
