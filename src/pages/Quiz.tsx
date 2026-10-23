import { useState, useEffect, type DragEvent } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { GameCard } from '../components/Cards';
import { saveQuizAttempt, fetchTopQuizAttempts } from '../services/firebase';
import type {
  BiomeChallenge,
  GameCardItem,
  GameType,
  QuizAttempt,
  TriviaQuestion,
} from '../types';

const gameCatalog: GameCardItem[] = [
  {
    id: 'cuestionario',
    title: 'Cuestionario',
    description:
      'Una divertida trivia de 6 preguntas donde aprenderás sobre el cuidado del agua, la energía y el plástico.',
    imageUrl:
      '/assets/questionnaire-icon-in-comic-style-online-survey-cartoon-illustration-on-white-isolated-background-checklist-report-splash-effect-busi.jpg',
    route: '/quiz',
  },
  {
    id: 'sopa_letras',
    title: 'Sopa de letras',
    description:
      'Diviértete con esta sopa de letras llena de palabras ecológicas y mide tu tiempo.',
    imageUrl: '/assets/istockphoto-1369772028-612x612.jpg',
    route: '/quiz',
  },
  {
    id: 'biomas',
    title: 'Quiz de Biomas',
    description:
      '¡Elige o arrastra bien! Identifica las imágenes de Taiga, Tundra, Bosque Mediterráneo, Pastizal y Desierto.',
    imageUrl:
      '/assets/depositphotos_317551840-stock-illustration-quiz-logo-icon-vector-symbol.jpg',
    route: '/quiz',
  },
];

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: '1) ¿Por qué es importante cuidar el agua?',
    options: [
      'a) Es el líquido más importante de la naturaleza, sin ella no podríamos vivir',
      'b) Nos ayuda a estar sanos, a hacer la digestión, mantiene la musculatura en buen estado y transporta oxígeno',
      'c) En el planeta el 97% es agua salada y solo el 3% es agua dulce',
      'd) Para lavar la vereda',
      'e) Para jugar cuando hace calor',
      'f) Respuesta A, B y C SON CORRECTAS',
    ],
    correctOption: 'f) Respuesta A, B y C SON CORRECTAS',
  },
  {
    id: 2,
    question: '2) ¿Cómo podemos reducir el consumo de agua?',
    options: [
      'a) Cerrar el grifo mientras nos lavamos la cara, los dientes, las manos o los platos',
      'b) No tirar residuos como papeles o envoltorios al inodoro y reciclar siempre que sea posible',
      'c) Regar las plantas con regadera o por sistemas de goteo',
      'd) Todas son correctas',
    ],
    correctOption: 'd) Todas son correctas',
  },
  {
    id: 3,
    question: '3) ¿Por qué es importante cuidar la energía eléctrica?',
    options: [
      'a) La iluminación representa cerca de un tercio de la energía que se consume en el hogar',
      'b) Ayuda al medio ambiente evitando emisiones de gases de efecto invernadero',
      'c) Evita el agotamiento de las energías no renovables',
      'd) Todas son correctas',
    ],
    correctOption: 'd) Todas son correctas',
  },
  {
    id: 4,
    question: '4) ¿Cómo podemos reducir el uso de la energía eléctrica?',
    options: [
      'a) Apagar los equipos eléctricos cuando no estén en uso',
      'b) Aprovechar la energía solar',
      'c) Poniendo una vela',
      'd) Encender sólo lo necesario',
      'e) Emplear tecnología que ahorre energía eléctrica',
      'f) A-B-D-E son correctas',
    ],
    correctOption: 'f) A-B-D-E son correctas',
  },
  {
    id: 5,
    question: '5) ¿Qué pasa con el plástico?',
    options: [
      'a) El plástico es un material que el planeta no puede digerir',
      'b) No pasa nada, lo utilizo y ya está',
      'c) Tarda cientos de años en descomponerse en el medio ambiente, hasta 1.000 años según el tipo',
      'd) Se descompone rápido. No me voy a poner a pensar en eso',
      'e) A y C son correctas',
    ],
    correctOption: 'e) A y C son correctas',
  },
  {
    id: 6,
    question: '6) ¿Cómo reducimos el plástico?',
    options: [
      'a) Llevar una botella reutilizable',
      'b) No utilizar bolsas de plástico, mejor las de tela',
      'c) Evitar usar sorbetes desechables',
      'd) Todas son correctas',
    ],
    correctOption: 'd) Todas son correctas',
  },
];

const biomeOptionsList = [
  {
    id: 'bosque_mediterraneo',
    label: 'Bosque Mediterráneo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Sierra_de_Burete.JPG',
  },
  {
    id: 'tundra',
    label: 'Tundra',
    imageUrl:
      'https://concepto.de/wp-content/uploads/2018/10/tundra1-e1539985627461-800x400.jpg',
  },
  {
    id: 'desierto',
    label: 'Desierto',
    imageUrl: 'https://concepto.de/wp-content/uploads/2018/09/desierto1-e1537800039547.jpg',
  },
  {
    id: 'pastizal',
    label: 'Pastizal',
    imageUrl:
      'https://64.media.tumblr.com/52341581ec39b94e96336e540ddef373/tumblr_inline_ml8040Bd9X1rjgb8g.jpg',
  },
  {
    id: 'taiga',
    label: 'Taiga',
    imageUrl: 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/vejetacion-taiga.jpg',
  },
];

const biomeChallenges: BiomeChallenge[] = [
  {
    id: 1,
    biomeName: 'Taiga',
    question: '¿Cuál de las siguientes imágenes corresponde a Taiga?',
    correctOptionId: 'taiga',
    options: biomeOptionsList,
  },
  {
    id: 2,
    biomeName: 'Tundra',
    question: '¿Cuál de las siguientes imágenes corresponde a Tundra?',
    correctOptionId: 'tundra',
    options: biomeOptionsList,
  },
  {
    id: 3,
    biomeName: 'Bosque Mediterráneo',
    question: '¿Cuál de las siguientes imágenes corresponde a Bosque Mediterráneo?',
    correctOptionId: 'bosque_mediterraneo',
    options: biomeOptionsList,
  },
  {
    id: 4,
    biomeName: 'Pastizal',
    question: '¿Cuál de las siguientes imágenes corresponde a Pastizal?',
    correctOptionId: 'pastizal',
    options: biomeOptionsList,
  },
  {
    id: 5,
    biomeName: 'Desierto',
    question: '¿Cuál de las siguientes imágenes corresponde a Desierto?',
    correctOptionId: 'desierto',
    options: biomeOptionsList,
  },
];

const wordSearchGrid: string[][] = [
  ['H', 'X', 'M', 'R', 'T', 'Q', 'D', 'I', 'W', 'S', 'N', 'S', 'E', 'B'],
  ['F', 'Y', 'F', 'R', 'E', 'C', 'I', 'C', 'L', 'A', 'R', 'K', 'D', 'J'],
  ['Z', 'C', 'O', 'N', 'S', 'E', 'R', 'V', 'A', 'C', 'I', 'O', 'N', 'L'],
  ['K', 'S', 'R', 'R', 'E', 'D', 'U', 'C', 'I', 'R', 'E', 'J', 'L', 'G'],
  ['T', 'M', 'E', 'D', 'I', 'O', 'A', 'M', 'B', 'I', 'E', 'N', 'T', 'E'],
  ['A', 'N', 'N', 'T', 'Q', 'T', 'L', 'V', 'D', 'T', 'A', 'N', 'V', 'W'],
  ['C', 'X', 'M', 'E', 'C', 'O', 'L', 'O', 'G', 'I', 'A', 'G', 'O', 'M'],
  ['G', 'R', 'Q', 'X', 'W', 'O', 'A', 'H', 'O', 'R', 'R', 'O', 'G', 'Q'],
  ['P', 'C', 'T', 'R', 'E', 'U', 'T', 'I', 'L', 'I', 'Z', 'A', 'R', 'K'],
  ['S', 'G', 'B', 'A', 'Y', 'Z', 'R', 'T', 'K', 'Q', 'O', 'X', 'P', 'F'],
  ['Y', 'F', 'P', 'L', 'A', 'N', 'E', 'T', 'A', 'D', 'I', 'Q', 'A', 'Z'],
  ['L', 'C', 'H', 'N', 'V', 'H', 'H', 'Y', 'W', 'I', 'A', 'I', 'R', 'E'],
  ['I', 'A', 'G', 'U', 'A', 'U', 'I', 'U', 'U', 'O', 'X', 'C', 'T', 'M'],
  ['N', 'D', 'N', 'F', 'G', 'O', 'I', 'Z', 'R', 'X', 'Y', 'V', 'F', 'I'],
];

const targetWords = [
  'MEDIOAMBIENTE',
  'ECOLOGIA',
  'PLANETA',
  'AIRE',
  'AGUA',
  'REUTILIZAR',
  'REDUCIR',
  'RECICLAR',
  'AHORRO',
  'CONSERVACION',
];

export function Quiz() {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaFeedback, setTriviaFeedback] = useState<string | null>(null);
  const [triviaFinished, setTriviaFinished] = useState(false);

  const [biomeIndex, setBiomeIndex] = useState(0);
  const [biomeMatched, setBiomeMatched] = useState<string | null>(null);
  const [biomeWrong, setBiomeWrong] = useState(false);
  const [biomeFinished, setBiomeFinished] = useState(false);

  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<string[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    void fetchTopQuizAttempts(6).then(setRecentAttempts);
  }, []);

  useEffect(() => {
    if (activeGame !== 'sopa_letras' || foundWords.length === targetWords.length) {
      return;
    }
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeGame, foundWords.length]);

  const recordScoreInFirestore = async (
    gameType: GameType,
    score: number,
    totalQuestions: number,
    durationSeconds = 0
  ) => {
    const cleanName = playerName.trim() || 'Explorador EcoKids';
    try {
      const id = await saveQuizAttempt({
        playerName: cleanName,
        gameType,
        score,
        totalQuestions,
        durationSeconds,
      });
      const attempt: QuizAttempt = {
        id,
        playerName: cleanName,
        gameType,
        score,
        totalQuestions,
        durationSeconds,
        completedAt: new Date().toISOString(),
      };
      setRecentAttempts((prev) => [attempt, ...prev.slice(0, 5)]);
      setSaveFeedback(`Puntaje guardado en Firestore para ${cleanName}.`);
    } catch {
      setSaveFeedback('Puntaje calculado localmente.');
    }
  };

  const handleTriviaOptionClick = (option: string) => {
    const currentQuestion = triviaQuestions[triviaIndex];
    const isCorrect = option === currentQuestion.correctOption;
    const nextScore = isCorrect ? triviaScore + 1 : triviaScore;

    setTriviaScore(nextScore);
    setTriviaFeedback(
      isCorrect
        ? `¡Respuesta Correcta! Puntaje: ${nextScore}`
        : 'Respuesta Incorrecta'
    );

    if (triviaIndex + 1 < triviaQuestions.length) {
      setTriviaIndex((prev) => prev + 1);
    } else {
      setTriviaFinished(true);
      void recordScoreInFirestore('cuestionario', nextScore, triviaQuestions.length);
    }
  };

  const resetTrivia = () => {
    setTriviaIndex(0);
    setTriviaScore(0);
    setTriviaFeedback(null);
    setTriviaFinished(false);
    setSaveFeedback(null);
  };

  const verifyBiomeSelection = (optionId: string) => {
    const currentBiome = biomeChallenges[biomeIndex];
    if (optionId === currentBiome.correctOptionId) {
      const matchedOption = currentBiome.options.find((opt) => opt.id === optionId);
      setBiomeMatched(matchedOption?.imageUrl ?? null);
      setBiomeWrong(false);
    } else {
      setBiomeWrong(true);
      window.setTimeout(() => setBiomeWrong(false), 1800);
    }
  };

  const handleBiomeDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedId = event.dataTransfer.getData('text/plain');
    if (droppedId) {
      verifyBiomeSelection(droppedId);
    }
  };

  const nextBiomeStep = () => {
    if (biomeIndex + 1 < biomeChallenges.length) {
      setBiomeIndex((prev) => prev + 1);
      setBiomeMatched(null);
      setBiomeWrong(false);
    } else {
      setBiomeFinished(true);
      void recordScoreInFirestore('biomas', biomeChallenges.length, biomeChallenges.length);
    }
  };

  const resetBiomes = () => {
    setBiomeIndex(0);
    setBiomeMatched(null);
    setBiomeWrong(false);
    setBiomeFinished(false);
    setSaveFeedback(null);
  };

  const toggleWordCell = (rowIdx: number, colIdx: number) => {
    const cellKey = `${rowIdx}-${colIdx}`;
    const updatedSelection = selectedCells.includes(cellKey)
      ? selectedCells.filter((key) => key !== cellKey)
      : [...selectedCells, cellKey];

    const candidateWord = updatedSelection
      .map((key) => {
        const [r, c] = key.split('-').map(Number);
        return wordSearchGrid[r][c];
      })
      .join('');

    const matchedTarget = targetWords.find(
      (word) => word === candidateWord && !foundWords.includes(word)
    );

    if (matchedTarget) {
      const nextFoundWords = [...foundWords, matchedTarget];
      setFoundWords(nextFoundWords);
      setFoundCells((prev) => [...new Set([...prev, ...updatedSelection])]);
      setSelectedCells([]);

      if (nextFoundWords.length === targetWords.length) {
        void recordScoreInFirestore(
          'sopa_letras',
          targetWords.length,
          targetWords.length,
          elapsedSeconds
        );
      }
    } else {
      setSelectedCells(updatedSelection);
    }
  };

  const resetWordSearch = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setFoundCells([]);
    setElapsedSeconds(0);
    setSaveFeedback(null);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main className="page-content">
      <SectionHeader title="Juegos y Quiz Interactivo" />

      <section className="wrapper content-card flex-column align-items-center">
        <div className="w-100 max-w-md mb-3 text-start">
          <label htmlFor="playerName" className="fw-bold mb-1 d-block">
            Nombre del jugador (para guardar tu récord en EcoKids):
          </label>
          <input
            id="playerName"
            type="text"
            className="form-control"
            placeholder="Ej. Sofía, Mateo, Grupo 3A..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>

        <div className="games-container w-100">
          {gameCatalog.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelectGame={(id) => {
                setActiveGame(id);
                setSaveFeedback(null);
              }}
            />
          ))}
        </div>
      </section>

      {saveFeedback && (
        <div className="container my-3">
          <div className="alert alert-success" role="status">
            {saveFeedback}
          </div>
        </div>
      )}

      {activeGame === 'cuestionario' && (
        <section className="wrapper quiz-stage">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">Cuestionario Ambiental</h3>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setActiveGame(null)}
            >
              Cerrar juego
            </button>
          </div>

          {!triviaFinished ? (
            <div className="trivia-box">
              <img
                src="/assets/manos-sembrando.avif"
                alt="Niños cuidando el medio ambiente"
                className="quiz-banner-img"
                width={500}
                height={240}
              />
              <h4 className="pregunta">{triviaQuestions[triviaIndex].question}</h4>
              <div className="opciones">
                {triviaQuestions[triviaIndex].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleTriviaOptionClick(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {triviaFeedback && (
                <p className="fw-bold text-center mt-3 mb-0">{triviaFeedback}</p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <h3>¡Fin del Cuestionario!</h3>
              <p className="fs-4 text-center">
                Tu puntaje final es: <strong>{triviaScore}</strong> de{' '}
                <strong>{triviaQuestions.length}</strong>
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button type="button" className="btn btn-success" onClick={resetTrivia}>
                  Reiniciar Cuestionario
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setActiveGame(null)}
                >
                  Ver otros juegos
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {activeGame === 'biomas' && (
        <section className="wrapper quiz-stage">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">
              Quiz de Biomas ({biomeIndex + 1} / {biomeChallenges.length})
            </h3>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setActiveGame(null)}
            >
              Cerrar juego
            </button>
          </div>

          {!biomeFinished ? (
            <div className="text-center">
              <h4 className="mb-3">{biomeChallenges[biomeIndex].question}</h4>
              <p className="text-muted text-center small">
                Arrastra la imagen correcta al recuadro o haz clic sobre ella.
              </p>

              <div
                className="biome-dropzone mx-auto mb-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleBiomeDrop}
              >
                {biomeMatched ? (
                  <img
                    src={biomeMatched}
                    alt={biomeChallenges[biomeIndex].biomeName}
                    className="biome-matched-img"
                  />
                ) : (
                  <span>Arrastra o selecciona la imagen correcta aquí</span>
                )}
                {biomeWrong && (
                  <span className="biome-wrong-badge" aria-live="assertive">
                    ❌ Intenta con otra imagen
                  </span>
                )}
              </div>

              <div className="biome-options-grid">
                {biomeChallenges[biomeIndex].options.map((opt) => (
                  <img
                    key={opt.id}
                    src={opt.imageUrl}
                    alt={opt.label}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', opt.id)}
                    onClick={() => verifyBiomeSelection(opt.id)}
                    className="biome-option-img"
                  />
                ))}
              </div>

              {biomeMatched && (
                <div className="mt-4">
                  <p className="text-success fw-bold text-center">
                    ¡Correcto! Corresponde a {biomeChallenges[biomeIndex].biomeName}.
                  </p>
                  <button type="button" className="btn btn-success px-4" onClick={nextBiomeStep}>
                    {biomeIndex + 1 < biomeChallenges.length ? 'Siguiente Bioma →' : 'Finalizar Quiz'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-success">¡Felicitaciones!</h3>
              <p className="fs-5 text-center">
                Identificaste correctamente los {biomeChallenges.length} biomas del planeta.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button type="button" className="btn btn-success" onClick={resetBiomes}>
                  Jugar de nuevo
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setActiveGame(null)}
                >
                  Regresar a Juegos
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {activeGame === 'sopa_letras' && (
        <section className="wrapper quiz-stage word-search-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">Sopa de Letras Ecológica</h3>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setActiveGame(null)}
            >
              Cerrar juego
            </button>
          </div>

          <div className="word-search-layout">
            <div className="sopa-letras">
              {wordSearchGrid.map((row, rIdx) =>
                row.map((letter, cIdx) => {
                  const key = `${rIdx}-${cIdx}`;
                  const isSelected = selectedCells.includes(key);
                  const isFound = foundCells.includes(key);
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => toggleWordCell(rIdx, cIdx)}
                      className={`sopa-cell ${isSelected ? 'seleccionada' : ''} ${
                        isFound ? 'palabra-encontrada' : ''
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })
              )}
            </div>

            <div className="word-search-sidebar">
              <h4>Palabras a Buscar</h4>
              <ul className="word-target-list">
                {targetWords.map((word) => (
                  <li
                    key={word}
                    className={foundWords.includes(word) ? 'word-completed' : ''}
                  >
                    {word === 'MEDIOAMBIENTE' ? 'Medio Ambiente' : word}
                  </li>
                ))}
              </ul>

              <div className="timer-badge my-3">⏱️ Tiempo: {formatTime(elapsedSeconds)}</div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => setSelectedCells([])}
                >
                  Limpiar selección
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={resetWordSearch}
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {recentAttempts.length > 0 && (
        <section className="wrapper content-card flex-column">
          <h3 className="w-100 text-start mb-3">Últimos puntajes registrados</h3>
          <div className="table-responsive w-100">
            <table className="table table-striped align-middle mb-0 text-start">
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th>Juego</th>
                  <th>Puntaje</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map((attempt, index) => (
                  <tr key={attempt.id ?? index}>
                    <td className="fw-semibold">{attempt.playerName}</td>
                    <td className="text-capitalize">{attempt.gameType.replace('_', ' ')}</td>
                    <td>
                      <span className="badge bg-success">
                        {attempt.score} / {attempt.totalQuestions}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(attempt.completedAt).toLocaleDateString('es-MX')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
