const DIMENSION_FORMULAS = [
  {
    key: 'oportunidades',
    name: 'Búsqueda de Oportunidades e Iniciativas',
    calc: (q) => q(1) + q(12) - q(23) + q(34) + q(45) + 6
  },
  {
    key: 'persistencia',
    name: 'Persistencia',
    calc: (q) => q(2) + q(13) - q(24) + q(35) + q(46) + 6
  },
  {
    key: 'cumplimiento',
    name: 'Cumplimiento',
    calc: (q) => q(3) + q(14) + q(25) - q(36) + q(47) + 6
  },
  {
    key: 'eficiencia',
    name: 'Exigir Eficiencia y Calidad',
    calc: (q) => q(4) + q(15) + q(26) + q(37) + q(48)
  },
  {
    key: 'riesgos',
    name: 'Correr Riesgos Calculados',
    calc: (q) => q(5) + q(16) - q(27) + q(38) + q(49) + 6
  },
  {
    key: 'metas',
    name: 'Fijar Metas',
    calc: (q) => -q(6) + q(17) + q(28) + q(39) + q(50) + 6
  },
  {
    key: 'informacion',
    name: 'Búsqueda de Información',
    calc: (q) => q(7) - q(18) + q(29) + q(40) + q(51) + 6
  },
  {
    key: 'planificacion',
    name: 'Planificación Sistemática y Seguimiento',
    calc: (q) => q(8) + q(19) - q(30) + q(41) + q(52) + 6
  },
  {
    key: 'persuasion',
    name: 'Persuasión y Redes de Apoyo',
    calc: (q) => -q(9) + q(20) + q(31) + q(42) + q(53) + 6
  },
  {
    key: 'autoconfianza',
    name: 'Autoconfianza e Independencia',
    calc: (q) => -q(10) + q(21) + q(32) + q(43) + q(54) + 6
  }
];

export function getCorrectionPenalty(factor) {
  if (factor >= 24 && factor <= 25) return 7;
  if (factor >= 22 && factor <= 23) return 5;
  if (factor >= 20 && factor <= 21) return 3;
  if (factor <= 19) return 0;
  return 0;
}

function getFactorCorreccion(q) {
  return -q(11) - q(22) - q(33) + q(44) + q(55) + 18;
}

export function calculateResults(answers) {
  const q = (n) => Number(answers[n - 1] || 0);

  const factorCorreccion = getFactorCorreccion(q);
  const penalty = getCorrectionPenalty(factorCorreccion);

  const dimensions = DIMENSION_FORMULAS.map((dimension) => {
    const raw = dimension.calc(q);
    const corrected = raw - penalty;
    return {
      ...dimension,
      raw,
      corrected
    };
  });

  const totalGeneral = dimensions.reduce((acc, item) => acc + item.corrected, 0);

  return {
    dimensions,
    factorCorreccion,
    penalty,
    totalGeneral
  };
}

export function buildSummary(dimensions) {
  const ordered = [...dimensions].sort((a, b) => b.corrected - a.corrected);
  const strengths = ordered.slice(0, 3);
  const opportunities = [...ordered].reverse().slice(0, 3);

  return {
    strengths,
    opportunities,
    feedback:
      'Tu perfil muestra capacidades emprendedoras concretas. Refuerza tus fortalezas y trabaja de forma constante las áreas con menor puntaje para lograr mayor equilibrio.'
  };
}