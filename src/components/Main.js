
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import NavigationBar from './NavigationBar';
import WelcomePage from '../pages/WelcomePage';
import AsteroidsPage from '../pages/asteroids/AsteroidsPage';
import ExoplanetsPage from '../pages/exoplanets/ExoplanetsPage';
import HipsPage from '../pages/hips/HipsPage';
import FetchData from '../services/FetchData';

export default function Main() {

    FetchData()

    return (
        <Router basename="aladin-testbed">
            <div>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/exoplanets">
                        <ExoplanetsPage />
                    </Route>
                    <Route exact path="/asteroids">
                        <AsteroidsPage />
                    </Route>
                    <Route exact path="/hips">
                        <HipsPage />
                    </Route>
                </Switch>
            </div>
            <footer>
                <small> (C) 2021 - Nico Vermaas - version 1.0.0 - 3 aug 2022 - 10:00</small>
            </footer>
        </Router>

    );
}
