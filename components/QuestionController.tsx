import React from 'react';
import Question from './Question';

interface QuestionControllerProps {
  answer: string;
  question: number;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const QUESTIONS = {
  1: {
    htmlFor: 'game1',
    name: 'answer',
    options: [
      { value: '', key: '--Please choose an artist--' },
      { value: 'The Game', key: 'The Game' },
      { value: 'Fabolous', key: 'Fabolous' },
    ],
    title: 'Place your bet:',
  },
  2: {
    htmlFor: 'game1',
    name: 'answer',
    options: [
      { value: '', key: '--Yes or No--' },
      { value: 'Yes', key: 'Yes' },
      { value: 'No', key: 'No' },
    ],
    title: 'Place your bet:',
  },
  3: {
    htmlFor: 'game1',
    name: 'answer',
    options: [
      { value: '', key: '--Please choose an artist--' },
      { value: 'Fivio Foreign', key: 'Fivio Foreign' },
      { value: 'Pop Smoke', key: 'Pop Smoke' },
    ],
    title: 'Place your bet:',
  },
  4: {
    htmlFor: 'game1',
    name: 'answer',
    options: [
      { value: '', key: '--Please choose an artist--' },
      { value: 'Azchike', key: 'Azchike' },
      { value: 'Smino', key: 'Smino' },
      { value: 'Malia', key: 'Malia' },
      { value: 'Neither', key: 'Neither' },
    ],
    title: 'Place your bet:',
  },
  5: {
    htmlFor: 'game1',
    name: 'answer',
    options: [
      { value: '', key: '--Please choose an artist--' },
      { value: 'Azchike', key: 'Azchike' },
      { value: 'Smino', key: 'Smino' },
      { value: 'Malia', key: 'Malia' },
      { value: 'Neither', key: 'Neither' },
    ],
    title: 'Place your bet:',
  },
  // 6Roddy Rich "PEMFBA" Max B "House Money" XXXTENTACTION "Bad vibes FOREVER"
};

const mapQuestion = (question: number) => {
  switch (question) {
    case 1:
      return QUESTIONS[1];
    case 2:
      return QUESTIONS[2];
    case 3:
      return QUESTIONS[3];
    case 4:
      return QUESTIONS[4];
    default:
      return QUESTIONS[1];
  }
};

const QuestionController: React.FC<QuestionControllerProps> = ({
  answer,
  question,
  setAnswer,
}) => {
  const activeQuestion = mapQuestion(question);
  const { htmlFor, name, options, title } = activeQuestion;
  return (
    <Question
      answer={answer}
      htmlFor={htmlFor}
      name={name}
      options={options}
      title={title}
      setAnswer={setAnswer}
    />
  );
};

export default QuestionController;
