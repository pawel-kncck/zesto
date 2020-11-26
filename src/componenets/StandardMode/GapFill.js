import React from 'react';
import GapFillParagraph from './GapFillParagraph';
import ExerciseCard from './ExerciseCard';
import ExerciseTitle from './ExerciseTitle';

const GapFill = ({ exIndex, exercise }) => {
  const paragraphs = exercise.paragraphs;

  return (
    <ExerciseCard>
      <ExerciseTitle exIndex={exIndex} title={exercise.title} />
      {paragraphs.map((paragraph, index) => {
        return (
          <GapFillParagraph
            key={index}
            pgIndex={index}
            paragraph={paragraph}
            isNumbered={exercise.isNumbered}
          />
        );
      })}
    </ExerciseCard>
  );
};

export default GapFill;
