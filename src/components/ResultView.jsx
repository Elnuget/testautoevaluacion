import React from 'react';

function ResultView({ student, results, summary, onRestart, answers }) {
  const exportJson = () => {
    const payload = {
      student,
      answers,
      results,
      summary,
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
      `Factor de correccion: ${results.factorCorreccion}`,
      `Ajuste aplicado: -${results.penalty}`,
      `Total general: ${results.totalGeneral}`,
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
      <h2>Resultados de la evaluacion</h2>

      <div className="student-data">
        <p><strong>Nombre:</strong> {student.name}</p>
        <p><strong>Sexo:</strong> {student.sex}</p>
        <p><strong>Edad:</strong> {student.age}</p>
        <p><strong>Carrera:</strong> {student.career}</p>
      </div>

      <div className="totals">
        <p><strong>Factor de correccion:</strong> {results.factorCorreccion}</p>
        <p><strong>Ajuste aplicado:</strong> -{results.penalty}</p>
        <p><strong>Total general:</strong> {results.totalGeneral}</p>
      </div>

      <h3>Detalle por dimension</h3>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Puntaje</th>
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
        <h3>Resumen automatico</h3>
        <p>
          <strong>Fortalezas principales:</strong>{' '}
          {summary.strengths.map((item) => `${item.name} (${item.corrected})`).join(', ')}
        </p>
        <p>
          <strong>Areas a mejorar:</strong>{' '}
          {summary.opportunities.map((item) => `${item.name} (${item.corrected})`).join(', ')}
        </p>
        <p><strong>Retroalimentacion:</strong> {summary.feedback}</p>
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
