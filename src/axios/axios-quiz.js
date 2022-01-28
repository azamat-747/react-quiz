import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-604f7-default-rtdb.firebaseio.com/'
})