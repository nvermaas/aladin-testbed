import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'

import welcome_logo from '../assets/welcome-logo.jpg';

export default function WelcomeCard(props) {

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <h2>Welcome to this ReactJS/<a href="https://aladin.u-strasbg.fr/aladin.gml#AladinLite">AladinLight</a> demo app.</h2>
                    <Table>
                        <img src={welcome_logo} />

                    </Table>

                    <Card.Text>
                        <li><b>Asteroids</b>: Plotting 1000 points on Aladin, read from a REST API backend</li>
                        <li><b>Exoplanets</b>: Show event/control interaction between Aladin and React. Plotting 4400 points on Aladin</li>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

