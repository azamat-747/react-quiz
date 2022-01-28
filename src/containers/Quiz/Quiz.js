import React, {useState, useEffect} from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import {useParams} from "react-router-dom";

function Quiz() {
    const [allValues, setAllValues] = useState({
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    })

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`quizes/${id}.json`)
            const quiz = response.data

            setAllValues({...allValues, quiz, loading: false})
        }
        fetchData()
            .catch(console.error);
    });

    const onAnswerClickHandler = answerId => {
        if (allValues.answerState) {
            const key = Object.keys(allValues.answerState)[0]
            if (allValues.answerState[key] === 'success') {
                return
            }
        }

        const question = allValues.quiz[allValues.activeQuestion]
        const results = allValues.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            const answerState = {[answerId]: 'success'}

            setAllValues({
                ...allValues,
                answerState,
                results
            })

            console.log(allValues)

            timeOut()
        } else {
            results[question.id] = 'error'
            const answerState = {[answerId]: 'error'}
            setAllValues({
                ...allValues,
                answerState,
                results
            })

            console.log(allValues)

            timeOut()
        }
    }

    function timeOut() {
        const timeout = window.setTimeout(() => {
            if (isQuizFinished()) {
                setAllValues({
                    ...allValues,
                    isFinished: true
                })
            } else {
                setAllValues({
                    ...allValues,
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout)
        }, 1000)
    }

    function isQuizFinished() {
        return allValues.activeQuestion + 1 === allValues.quiz.length
    }

    const retryHandler = () => {
        setAllValues({
            ...allValues,
            activeQuestion: 0,
            answerState: false,
            isFinished: false,
            results: {}
        })
    }

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>

                {
                    allValues.loading
                        ? <Loader/>
                        : allValues.isFinished
                            ? <FinishedQuiz
                                resulsts={allValues.results}
                                quiz={allValues.quiz}
                                onRetry={retryHandler}
                            />
                            : <ActiveQuiz
                                answers={allValues.quiz[allValues.activeQuestion].answers}
                                question={allValues.quiz[allValues.activeQuestion].question}
                                onAnswerClick={onAnswerClickHandler}
                                quizLength={allValues.quiz.length}
                                answerNumber={allValues.activeQuestion + 1}
                                state={allValues.answerState}
                            />
                }
            </div>
        </div>
    )
}

export default Quiz