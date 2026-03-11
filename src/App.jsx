import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import StudentForm from './components/StudentForm';
import Questionnaire from './components/Questionnaire';
import ResultView from './components/ResultView';
import { questions } from './data/questions';
import {
  buildSummary,
  calculateResults,
  getCorrectionExplanation,
  getGlobalFeedback
} from './utils/scoring';
import { clearState, loadState, saveState } from './utils/storage';

const INITIAL_STUDENT = {
  name: '',
  sex: '',
  age: '',
  career: ''
};

function App() {
  const saved = loadState();

  const [step, setStep] = useState(saved?.step || 'intro');
  const [student, setStudent] = useState(saved?.student || INITIAL_STUDENT);
  const [answers, setAnswers] = useState(saved?.answers || Array(questions.length).fill(null));

  const results = useMemo(() => {
    const isComplete = answers.every(Boolean);
    if (!isComplete) return null;
    return calculateResults(answers);
  }, [answers]);

  const summary = useMemo(() => {
    if (!results) return null;
    return buildSummary(results.dimensions);
  }, [results]);

  const globalFeedback = useMemo(() => {
    if (!results) return null;
    return getGlobalFeedback(results.totalGeneral, results.gradeOverTen);
  }, [results]);

  const correctionExplanation = useMemo(() => {
    if (!results) return '';
    return getCorrectionExplanation(results.factorCorreccion, results.penalty);
  }, [results]);

  useEffect(() => {
    saveState({ step, student, answers });
  }, [step, student, answers]);

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setStudent((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleStart = () => {
    setStep('test');
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    const allAnswered = answers.every(Boolean);
    if (!allAnswered) return;
    setStep('results');
  };

  const handleRestart = () => {
    setStep('intro');
    setStudent(INITIAL_STUDENT);
    setAnswers(Array(questions.length).fill(null));
    clearState();
  };

  return (
    <main className="app-container">
      {step === 'intro' && (
        <StudentForm student={student} onChange={handleStudentChange} onStart={handleStart} />
      )}

      {step === 'test' && (
        <Questionnaire
          questions={questions}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onSubmit={handleSubmit}
        />
      )}

      {step === 'results' && results && summary && (
        <ResultView
          student={student}
          results={results}
          summary={summary}
          globalFeedback={globalFeedback}
          correctionExplanation={correctionExplanation}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}

export default App;
