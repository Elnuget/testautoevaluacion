import React from 'react';

function ResultView({
  student,
  results,
  summary,
  globalFeedback,
  correctionExplanation,
  onRestart,
  answers
}) {
  const exportJson = () => {
    const payload = {
      student,
      answers,
      results,
      summary,
      globalFeedback,
      correctionExplanation,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultado-test-autoevaluacion.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportTxt = () => {
    const lines = [
      'Test de Autoevaluacion de Conductas Emprendedoras',
      '',
      `Estudiante: ${student.name}`,
      `Sexo: ${student.sex}`,
      `Edad: ${student.age}`,
      `Carrera: ${student.career}`,
      '',
      `Nota sobre 10: ${results.gradeOverTen}`,
      `Factor de correccion: ${results.factorCorreccion}`,
      `Ajuste aplicado: -${results.penalty}`,
      `Total general: ${results.totalGeneral}`,
      '',
      `Nivel global: ${globalFeedback.level}`,
      `Retroalimentacion global: ${globalFeedback.message}`,
      '',
      'Explicacion del factor de correccion:',
      correctionExplanation,
      '',
      'Puntajes por dimension:'
    ];

    results.dimensions.forEach((dimension) => {
      lines.push(`- ${dimension.name}: ${dimension.corrected}`);
    });

    lines.push('');
    lines.push('Fortalezas principales:');
    summary.strengths.forEach((item) => lines.push(`- ${item.name} (${item.corrected})`));

    lines.push('');
    lines.push('Areas a mejorar:');
    summary.opportunities.forEach((item) => lines.push(`- ${item.name} (${item.corrected})`));

    lines.push('');
    lines.push(`Mensaje final: ${summary.feedback}`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultado-test-autoevaluacion.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="card printable-area">
      <div className="result-header">
        <div>
          <h2>Resultados de la evaluación</h2>
          <p className="result-subtitle">
            Tu resultado integra puntajes por conducta, total CE, factor de corrección y nota equivalente
            sobre 10.
          </p>
        </div>

        <aside className="grade-badge" aria-label="Nota final sobre 10">
          <span className="grade-badge-label">Nota final</span>
          <strong>{results.gradeOverTen}</strong>
          <small>sobre 10</small>
        </aside>
      </div>

      <div className="student-data">
        <p><strong>Nombre:</strong> {student.name}</p>
        <p><strong>Sexo:</strong> {student.sex}</p>
        <p><strong>Edad:</strong> {student.age}</p>
        <p><strong>Carrera:</strong> {student.career}</p>
      </div>

      <div className="totals">
        <p><strong>Total CE obtenido:</strong> {results.totalGeneral} / {results.maxTotal}</p>
        <p><strong>Factor de correccion:</strong> {results.factorCorreccion}</p>
        <p><strong>Ajuste aplicado:</strong> -{results.penalty}</p>
        <p><strong>Nivel global:</strong> {globalFeedback.level}</p>
      </div>

      <div className="scoring-explanation">
        <h3>Como se calculó tu resultado</h3>
        <ol>
          <li>Se tomaron tus respuestas y se aplicaron las fórmulas CE por cada conducta emprendedora.</li>
          <li>Se calculó el factor de corrección con los ítems 11, 22, 33, 44 y 55.</li>
          <li>Si el factor fue 20 o mayor, se aplicó un ajuste por conducta según la tabla oficial.</li>
          <li>Se sumaron las 10 conductas corregidas para obtener tu total CE final.</li>
          <li>El total CE se transformó a escala de 0 a 10 para obtener tu nota final.</li>
        </ol>
        <p><strong>Interpretación del factor de corrección:</strong> {correctionExplanation}</p>
      </div>

      <h3>Detalle por dimension</h3>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Puntaje final</th>
          </tr>
        </thead>
        <tbody>
          {results.dimensions.map((dimension) => (
            <tr key={dimension.key}>
              <td>{dimension.name}</td>
              <td>{dimension.corrected}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h3>Retroalimentación de tu calificación</h3>
        <p><strong>Lectura global:</strong> {globalFeedback.message}</p>
        <p>
          <strong>Fortalezas principales:</strong>{' '}
          {summary.strengths.map((item) => `${item.name} (${item.corrected})`).join(', ')}
        </p>
        <p>
          <strong>Areas a mejorar:</strong>{' '}
          {summary.opportunities.map((item) => `${item.name} (${item.corrected})`).join(', ')}
        </p>
        <p><strong>Recomendación final:</strong> {summary.feedback}</p>
      </div>

      <div className="actions">
        <button type="button" onClick={() => window.print()} className="secondary-btn">
          Imprimir / Guardar en PDF
        </button>
        <button type="button" onClick={exportTxt} className="secondary-btn">
          Descargar TXT
        </button>
        <button type="button" onClick={exportJson} className="secondary-btn">
          Descargar JSON
        </button>
        <button type="button" onClick={onRestart} className="primary-btn">
          Reiniciar test
        </button>
      </div>
    </section>
  );
}

export default ResultView;
