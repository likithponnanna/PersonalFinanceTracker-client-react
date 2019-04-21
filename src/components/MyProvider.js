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
        currentSelectedTab : 'OVERVIEW',
        user: undefined,
        creditCards: [],
        savingsAccounts: [],
        checkingAccounts: [],
        properties: []
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
                    }),
                setUser: (user) =>
                    this.setState(state => ({ user: user })),
                setCreditCards: (creditCards) =>
                    this.setState(state => ({ creditCards: creditCards })),
                pushCreditCard: (creditCard) => {
                    let newCreditCards = this.state.creditCards;
                    newCreditCards.push(creditCard);
                    this.setState(state => ({creditCards: newCreditCards}))
                },
                setSavingsAccounts: (savingsAccounts) =>
                    this.setState(state => ({ savingsAccounts: savingsAccounts })),
                pushSavingsAccount: (savingsAccount) => {
                    let newSavingsAccount = this.state.savingsAccounts;
                    newSavingsAccount.push(savingsAccount);
                    this.setState(state => ({savingsAccounts: newSavingsAccount}))
                },
                setcheckingAccounts: (checkingAccounts) =>
                    this.setState(state => ({ checkingAccounts: checkingAccounts })),
                pushCheckingAccount: (checkingAccount) => {
                    let newCheckingAccounts = this.state.checkingAccounts;
                    newCheckingAccounts.push(checkingAccount);
                    this.setState(state => ({checkingAccounts: newCheckingAccounts}))
                },
                setProperties: (Properties) =>
                    this.setState(state => ({ properties: Properties })),
                pushProperties: (Property) => {
                    let newProperties = this.state.properties;
                    newProperties.push(Property);
                    this.setState(state => ({properties: newProperties}))
                },


            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider
