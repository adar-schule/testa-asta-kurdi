// /frontend/utils/dummyQuestions.ts
export const questionsDummyData = [
    {
        id: 1,  // Changed to number
        type: 'multiselect',
        question: 'What is the capital of Kurdistan?',
        answers: ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk'],
    },
    {
        id: 2,  // Changed to number
        type: 'fillinput',
        question: 'The city of ___ is the capital of Kurdistan.',
        answers: []  // No answers needed for fillinput
    },
    {
        id: 3,  // Changed to number
        type: 'multiselect',
        question: 'Which of these cities is in Kurdistan?',
        answers: ['Baghdad', 'Erbil', 'Basra', 'Mosul'],
    },
];