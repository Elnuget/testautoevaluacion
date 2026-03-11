import React from 'react';

function StudentForm({ student, onChange, onStart }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart();
  };

  return (
    <section className="card">
      <h1>Test de Autoevaluación de Conductas Emprendedoras (CE)</h1>
      <p>
        Esta herramienta te ayudará a identificar fortalezas y áreas de mejora en tu perfil emprendedor.
      </p>
      <p>
        Al finalizar verás tu puntaje total CE, tu nota equivalente sobre 10 y una retroalimentación
        detallada para interpretar tus resultados.
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Nombre y apellido
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={onChange}
            required
            placeholder="Ejemplo: Ana Perez"
          />
        </label>

        <label>
          Sexo
          <input
            type="text"
            name="sex"
            value={student.sex}
            onChange={onChange}
            required
            placeholder="Ejemplo: Femenino"
          />
        </label>

        <label>
          Edad
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={onChange}
            min="1"
            max="120"
            required
          />
        </label>

        <label>
          Carrera
          <input
            type="text"
            name="career"
            value={student.career}
            onChange={onChange}
            required
            placeholder="Ejemplo: Administracion de Empresas"
          />
        </label>

        <button type="submit" className="primary-btn">
          Comenzar evaluacion
        </button>
      </form>
    </section>
  );
}

export default StudentForm;
