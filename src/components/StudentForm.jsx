function StudentForm({ student, onChange, onStart }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart();
  };

  return (
    <section className="card">
      <h1>Test de Autoevaluacion de Conductas Emprendedoras</h1>
      <p>
        Esta herramienta te permite identificar fortalezas y areas de mejora en tu perfil emprendedor.
      </p>
      <p>
        Instrucciones: lee cada afirmacion y responde con sinceridad usando una escala del 1 al 5.
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
          Escuela
          <input
            type="text"
            name="school"
            value={student.school}
            onChange={onChange}
            required
            placeholder="Nombre de la institucion"
          />
        </label>

        <label>
          Division
          <input
            type="text"
            name="division"
            value={student.division}
            onChange={onChange}
            required
            placeholder="Ejemplo: 3ro B"
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
