import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../styling/modals.style.client.css'
const BudgetTabContent = ({budget, createBudget, updateBudget, newBudget, budgetFlag, categoryChanged, toggleBudgetUpdate}) =>

    <div className="container">
        <MyContext.Consumer>
            {(context) => (
                <React.Fragment>
        {budget===null  && budgetFlag ===false && <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">$</span>
            </div>
            <input type="number" className="form-control"
                   aria-label="Enter monthly budget mount (to the nearest dollar)" onChange={(event)=>categoryChanged(event)}
            />

                <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                </div>
            <button className="btn btn-secondary ml-2" onClick={()=>createBudget()}>Create Budget</button>
        </div>}
                    {console.log(budget)}
        {budget!==null && budget.amount!==undefined && budgetFlag ===false && <div className="input-group row">
            <div className="col-12 web-dev-text-center">Your Monthly budget is</div>
            <div className="input-group-prepend">
                <span className="input-group-text disabled">$</span>
            </div>
            <input type="number" className="form-control input-group-append " disabled="disabled" aria-label="Monthly budget" value={budget.amount}/>
            <button className="btn btn-outline-secondary ml-2" onClick={()=>toggleBudgetUpdate()}>Update Budget</button>
        </div>}


                    {budget!==null && budgetFlag ===true && <div className="input-group row">
                        <div className="col-12 web-dev-text-center">Your Monthly budget is</div>
                        <div className="input-group-prepend">
                            <span className="input-group-text disabled">$</span>
                        </div>
                        <input type="number" className="form-control input-group-append"  aria-label="Monthly budget"
                               onChange={(event)=>categoryChanged(event)}/>
                        <button className="btn btn-success ml-2" onClick={()=>{toggleBudgetUpdate(); updateBudget()}}>Update Now</button>
                    </div>}
                </React.Fragment>
            )}
        </MyContext.Consumer>

    </div>;

export default BudgetTabContent
