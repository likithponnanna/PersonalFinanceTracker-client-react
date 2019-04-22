import Particles from 'react-particles-js';
import React, {Component} from 'react';
import '../styling/CustomerOnboard.style.client.css'


const ParticlesComponent = () =>
    <div id="particles">  <Particles
        params={{
            "particles": {
                "number": {
                    "value": 160,
                    "density": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 10,
                    "random": true
                },
                "move": {
                    "direction": "bottom",
                    "out_mode": "out"
                },
                "line_linked": {
                    "enable": false
                }
            },
            "interactivity": {
                "events": {
                    "onclick": {
                        "enable": true,
                        "mode": "remove"
                    }
                },
                "modes": {
                    "remove": {
                        "particles_nb": 10
                    }
                }
            }
        }} /></div>;

    export default ParticlesComponent
