import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../AppHeader/AppHeader";
import Spinner from "../Spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsesPage = lazy(() => import('../pages/ComicsesPage'));
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'))
const Page404 = lazy(() => import('../pages/404'));


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsesPage/>}/>
                            <Route path="/comics/:id" element={<SingleComicsPage/>}/>
                            <Route path="/char/:id" element={<SingleCharPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )  
}

export default App;