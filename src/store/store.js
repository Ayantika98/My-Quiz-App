import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import quizReducer from './quizSlice';

const store = configureStore({
    reducer: {
        quizReducer: quizReducer
    },
    middleware: [thunk]
});

export default store;