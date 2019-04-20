import React, { Component } from 'react';
import MyContext from './MyContext'

// first we will make a new context


// Then create a provider Component
class MyProvider extends Component {
    state = {
        name: 'Alice',
        age: 21,
        sidebarAct: false,
        creditItemsCollapse: true,
        savingsCollapse: false,
        checkingCollapse: false,
        stockCollapse: false,
        propertyCollapse: false,
        userMainNavBar: false,
        currentSelectedTab : 'OVERVIEW'
    };
    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                growAYearOlder: () => this.setState({
                    age: this.state.age + 1
                }),
                toggleCreditCard: () =>{
                    this.setState(state => ({ creditItemsCollapse: !state.creditItemsCollapse }));
                },
                toggleSavings: () => {
                    this.setState(state => ({ savingsCollapse: !state.savingsCollapse }));
                },
                toggleChecking: () =>{
                    this.setState(state => ({ checkingCollapse: !state.checkingCollapse }));
                },
                toggleStocks: ()  =>{
                    this.setState(state => ({ stockCollapse: !state.stockCollapse }));
                },
                toggleProperty: () =>{
                    this.setState(state => ({ propertyCollapse: !state.propertyCollapse }));
                },
                toggleUserMainNavBar: ()=>
                    this.setState(state => ({ userMainNavBar: !state.userMainNavBar })),
                sidebarCollapse: () =>
                    this.setState({
                        sidebarAct: !this.state.sidebarAct
                    }),
                setCurrentSelectedTab: (tabName) =>
                    this.setState({
                        currentSelectedTab: tabName
                    })


            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider
