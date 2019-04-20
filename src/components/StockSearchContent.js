import React, {Component} from 'react'
import MyContext from './MyContext'
import {Link} from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const StockSearchContent = ({stateSearchData,stockSymbolSearchChange, searchStock, stockSymbolForSearch}) =>
    <div>
        <div className="input-group mb-3">
            <input onChange={(event) => stockSymbolSearchChange(event)} type="text" className="form-control" placeholder="Type your Search Query here"
                   aria-label="Type your Search Query here" aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <Link to={`/stock-search/search?stockSymbol=${stockSymbolForSearch}`}>   <button className="btn btn-outline-secondary" type="button" onClick={() =>{ searchStock(stockSymbolForSearch)}}>Search Stock</button></Link>
            </div>
        </div>

        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
            </tr>
            </thead>
            <tbody>
            {
                stateSearchData.map(
                    (stock, index) => {
                        return (
                            <tr key={stock.id}>
                                <th scope="row">{index+1}</th>
                                <td>{stock[0].stockSymbol}</td>
                                <td>{stock[0].stockName}</td>
                                <td>{stock[0].stockEquity}</td>
                            </tr>
                        )})
            }

            </tbody>
        </table>
    </div>;

export default StockSearchContent
