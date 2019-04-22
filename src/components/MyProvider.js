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
        properties: [],
        stocksOwned: [],
        showCreditModal: false
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
                deleteCreditCard: (creditId) => {
                    this.setState(state => ({ creditCards:  this.state.creditCards.filter(creditCard => creditCard._id !== creditId) }))
                },
                updateCreditCard: (creditCardN) =>{
                    this.setState({
                      creditCards: this.state.creditCards.map(creditCard =>
                                creditCard._id === creditCardN._id ? creditCardN : creditCard,
                        )})
                },
                setSavingsAccounts: (savingsAccounts) =>
                    this.setState(state => ({ savingsAccounts: savingsAccounts })),
                pushSavingsAccount: (savingsAccount) => {
                    let newSavingsAccount = this.state.savingsAccounts;
                    newSavingsAccount.push(savingsAccount);
                    this.setState(state => ({savingsAccounts: newSavingsAccount}))
                },
                deleteSavingsAccount: (savingsAccId) => {
                    this.setState(state => ({ savingsAccounts:  this.state.savingsAccounts.filter(savingsAccount => savingsAccount._id !== savingsAccId) }))
                },
                updateSavingsAccount: (savingsAccN) =>{
                    this.setState({
                        creditCards: this.state.savingsAccounts.map(savingsAccount =>
                            savingsAccount._id === savingsAccN._id ? savingsAccN : savingsAccount,
                        )})
                },
                setcheckingAccounts: (checkingAccounts) =>
                    this.setState(state => ({ checkingAccounts: checkingAccounts })),
                pushCheckingAccount: (checkingAccount) => {
                    let newCheckingAccounts = this.state.checkingAccounts;
                    newCheckingAccounts.push(checkingAccount);
                    this.setState(state => ({checkingAccounts: newCheckingAccounts}))
                },
                deleteCheckingAccount: (CheckingAccountId) => {
                    this.setState(state => ({ checkingAccounts:  this.state.checkingAccounts.filter(checkingAccount => checkingAccount._id !== CheckingAccountId) }))
                },
                updateCheckingAccount: (CheckingAccountN) =>{
                    this.setState({
                        checkingAccounts: this.state.checkingAccounts.map(checkingAccount =>
                            checkingAccount._id === CheckingAccountN._id ? CheckingAccountN : checkingAccount,
                        )})
                },
                setProperties: (Properties) =>
                    this.setState(state => ({ properties: Properties })),
                pushProperty: (Property) => {
                    let newProperties = this.state.properties;
                    newProperties.push(Property);
                    this.setState(state => ({properties: newProperties}))
                },
                deleteProperty: (PropertyId) => {
                    this.setState(state => ({ properties:  this.state.properties.filter(property => property._id !== PropertyId) }))
                },
                updateProperty: (PropertyN) =>{
                    this.setState({
                        properties: this.state.properties.map(Property =>
                            Property._id === PropertyN._id ? PropertyN : Property,
                        )})
                },
                setStocksOwned: (Stocks) =>
                    this.setState(state => ({ stocksOwned: Stocks })),
                pushStockOwned: (Stock) => {
                    let newStocks = this.state.properties;
                    newStocks.push(Stock);
                    this.setState(state => ({stocksOwned: newStocks}))
                },
                deleteStockOwned: (StockId) => {
                    this.setState(state => ({ stocksOwned:  this.state.stocksOwned.filter(Stock => Stock._id !== StockId) }))
                },
                updateStockOwned: (StockN) =>{
                    this.setState({
                        stocksOwned: this.state.stocksOwned.map(Stock =>
                            Stock._id === StockN._id ? StockN : Stock,
                        )})
                },


            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider
