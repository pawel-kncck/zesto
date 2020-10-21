import React from 'react'
import GapFill from './ExerciseTypes/GapFill';

const Exercise = ({ type, mode, index }) => {
    const bgColor = mode === 'edit' ? '#eee' : '#fff';

    return (
        <div style={{ background: bgColor }}>
            {type === 'gap_fill' ? <GapFill mode={mode} exIndex={index} /> : null }
        </div>
    )
}

export default Exercise;