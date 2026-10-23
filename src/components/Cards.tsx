import { Link } from 'react-router-dom';
import type { ContaminantCategory, GameCardItem } from '../types';

interface ContaminantCardProps {
  item: ContaminantCategory;
  prioritizeImage?: boolean;
}

export function ContaminantCard({ item, prioritizeImage = false }: ContaminantCardProps) {
  return (
    <article className="contaminant-card">
      <Link to={item.route} className="contaminant-card-link">
        <div className="contaminant-icon-wrap">
          <img
            src={item.imageUrl}
            alt={item.title}
            width={100}
            height={100}
            decoding="async"
            {...(prioritizeImage ? { fetchPriority: 'high' } : { loading: 'lazy' })}
          />
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <span className="btn btn-outline-success btn-sm mt-2">Explorar tema</span>
      </Link>
    </article>
  );
}

interface GameCardProps {
  game: GameCardItem;
  onSelectGame?: (gameId: GameCardItem['id']) => void;
}

export function GameCard({ game, onSelectGame }: GameCardProps) {
  return (
    <div className="card game-card shadow-sm">
      <img
        src={game.imageUrl}
        className="card-img-top game-card-img"
        alt={game.title}
        width={288}
        height={200}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{game.title}</h5>
        <p className="card-text flex-grow-1">{game.description}</p>
        {onSelectGame ? (
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={() => onSelectGame(game.id)}
          >
            Jugar ahora
          </button>
        ) : (
          <Link to={game.route} className="btn btn-success w-100">
            Jugar
          </Link>
        )}
      </div>
    </div>
  );
}
