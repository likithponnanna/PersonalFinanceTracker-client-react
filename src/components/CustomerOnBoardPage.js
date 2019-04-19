import React, {Component} from 'react'
import MyContext from './MyContext'

class CustomerOnBoardPage extends Component{


    constructor(props){
        super(props);
            this.state = {

            }

    }


    render() {
        return(

            <div>This is the login Page
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <p>Age: {context.state.age}</p>
                            <p>Name: {context.state.name}</p>
                            <button onClick={context.growAYearOlder}>Add one to age</button>
                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }


}

export default CustomerOnBoardPage