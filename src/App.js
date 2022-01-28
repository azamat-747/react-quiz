import Layout from "./hoc/Layout/Layout";
import {Routes, Route} from 'react-router-dom';
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<QuizList/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/quiz_creator" element={<QuizCreator/>}/>
                <Route path="/quiz/:id" element={<Quiz/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
