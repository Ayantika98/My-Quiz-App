import axios from 'axios';
import { setQuizs } from './quizSlice';

const token = 'u6KyPrg0d91CQLLHiuFouOmasbcSlQYoSidoRvsg';

export const getQuizs = () => (dispatch) => {
    axios.get('https://the-trivia-api.com/api/questions?limit=10',
        {
            headers: {
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                function shuffleArray(array) {
                    return array?.sort(() => Math.random() - 0.5);
                }
                const myData = res?.data?.map((x) => {
                    return {
                        ...x,
                        options: shuffleArray([x?.correctAnswer, ...x?.incorrectAnswers]),
                        // options: shuffleArray(x?.opt)
                    }
                });
                console.log(myData);
                dispatch(setQuizs(myData));
            }
        })
}
