import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../styling/modals.style.client.css'

const BillsContent = () =>
    <div className="container">
        <div className="card-columns">
            {

                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional
                            content.</p>
                        <button className="btn bg-secondary card-footer">
                            <b className=" web-dev-white-text">Mark as paid</b>
                        </button>
                    </div>
                </div>

            }
        </div></div>;

export default BillsContent
