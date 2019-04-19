import React, { Component } from 'react';
import MyContext from './MyContext'

// first we will make a new context


// Then create a provider Component
class MyProvider extends Component {
    state = {
        name: 'Alice',
        age: 21
    };
    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                growAYearOlder: () => this.setState({
                    age: this.state.age + 1
                })
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyProvider
