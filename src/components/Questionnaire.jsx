import React from 'react';
import { scaleLabels } from '../data/questions';
import ProgressBar from './ProgressBar';

function Questionnaire({ questions, answers, onAnswerChange, onSubmit }) {
  const missingIndexes = questions
    .map((_, index) => index)
    .filter((index) => !answers[index]);

  const answered = questions.length - missingIndexes.length;

  return (
    <section className="card">
      <h2>Cuestionario de Conductas Emprendedoras</h2>
      <p>
        Lee cada afirmación y selecciona qué tanto te representa en una escala del 1 al 5. Todas las
        respuestas son obligatorias para calcular tu resultado final.
      </p>

      <div className="scale-legend" aria-label="Guía de la escala de respuestas">
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value} className="scale-legend-item">
            <strong>{value}</strong>
            <small>{scaleLabels[value]}</small>
          </span>
        ))}
      </div>

      <ProgressBar answered={answered} total={questions.length} />

      {missingIndexes.length > 0 && (
        <p className="warning">
          Faltan {missingIndexes.length} respuestas para poder calcular el resultado.
        </p>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <ol className="questions-list">
          {questions.map((question, index) => {
            const questionNumber = index + 1;
            const isMissing = !answers[index];

            return (
              <li key={questionNumber} className={`question-card ${isMissing ? 'missing' : ''}`}>
                <p>
                  <strong>Pregunta {questionNumber}.</strong> {question}
                </p>

                <div className="scale-grid" role="radiogroup" aria-label={`Pregunta ${questionNumber}`}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name={`question-${questionNumber}`}
                        checked={Number(answers[index]) === value}
                        onChange={() => onAnswerChange(index, value)}
                      />
                      <span>{value} - {scaleLabels[value]}</span>
                    </label>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <button type="submit" className="primary-btn">Calcular resultados</button>
      </form>
    </section>
  );
}

export default Questionnaire;

