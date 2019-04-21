import React, { Component } from 'react';
import MyContext from './MyContext'

// first we will make a new context


// Then create a provider Component
class MyProvider extends Component {
    state = {
        name: 'Alice',
        age: 21,
        selectedTabForGuest: 'CREDIT_CARD',
        guestForm:false,
        selectedTabForAdminUser: ' ',
        addUserByGuestButton:false
    };
    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                growAYearOlder: () => this.setState({
                    age: this.state.age + 1
                }),
                setSelectedTabForGuest : (tab) => this.setState({
                   selectedTabForGuest:tab
                   }),
                setSelectedTabForAdminUser : (tab) => this.setState({
                selectedTabForAdminUser:tab
                }),
                setAddUserByGuestButton : (tab) => this.setState({
                    addUserByGuestButton:tab
                 })



            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider