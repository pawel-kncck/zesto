import React from 'react'
import GapFillParagraph from './GapFillParagraph';
import ExerciseCard from './ExerciseCard';
import ExerciseTitle from './ExerciseTitle';

const GapFill = ({ exIndex, exercise }) => {
    const paragraphs = exercise.paragraphs;
    const isNumbered = exercise.is_numbered;

    return (
        <ExerciseCard>
            <ExerciseTitle exIndex={exIndex} title={exercise.title} />
            {paragraphs.map((paragraph, index) => {
                return <GapFillParagraph pgIndex={index} paragraph={paragraph} isNumbered={isNumbered}/>
            })}
        </ExerciseCard>
    )
}

export default GapFill;