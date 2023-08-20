import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizs: [],
    question: {},
    questionIndex: 0,
    correctAnswer: '',
    selectedAnswer: '',
    marks: 0
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuizs: (state, action) => {
            state.quizs = [...action.payload]
        },
        setQuestion: (state, action) => {
            state.question = { ...action.payload }
        },
        setIndex: (state, action) => {
            const newIndex = action.payload;
            if (newIndex >= 0 && newIndex < state.quizs.length) {
                state.questionIndex = newIndex;
            }
        },
        setCorrectAnswer: (state, action) => {
            state.correctAnswer = action.payload
        },
        setSelectedAnswer: (state, action) => {
            state.selectedAnswer = action.payload
        },
        setMarks: (state, action) => {
            state.marks = action.payload
        },
    }
});

export const { setQuizs, setQuestion, setIndex, setCorrectAnswer, setSelectedAnswer, setMarks } = quizSlice.actions;
export default quizSlice.reducer;