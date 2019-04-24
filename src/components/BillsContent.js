import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../styling/modals.style.client.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function TabContainer(props) {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                    {props.children}
            </Typography>
        );
}

TabContainer.propTypes = {
        children: PropTypes.node.isRequired,
};

const styles = theme => ({
        root: {
                flexGrow: 1,
                width: '100%',
                backgroundColor: theme.palette.background.paper,
        },
});

class BillsContent extends React.Component {

        state = {
                value: 0,
        };

        handleChange = (event, value) => {
                this.setState({ value });
        };

        render() {
                const { classes } = this.props;
                const { value } = this.state;

                return (

<div className="container">

        <div className={classes.root}>
                <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            textColor="primary"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            centered

                        >
                        >
                                <Tab label="Unpaid Bills" />
                                <Tab label="Paid Bills" />


                        </Tabs>
                </AppBar>
                {value === 0 &&
                <TabContainer>
                        <div className="card-columns" onClick={()=> this.props.getUnpaidBills()}>
                        {

                                        this.props.unpaidBills.map((bill,index)  =>

                                <div className="card text-center" key={index}>
                                        <div className="card-body">
                                                <h5 className="card-title">Bill Type: {bill.billType}</h5>
                                                <p className="card-text">Bill Name: {bill.billName}</p>
                                                <p className="card-text">Bill Name: {bill.bill_due_date}</p>
                                                <p className="card-text">Bill Name:{bill.bill_posted_date}</p>
                                                <p className="card-text">Bill Amount: <b>{bill.bill_amount}</b></p>
                                                <button className="btn bg-secondary card-footer">
                                                        <b className=" web-dev-white-text" onClick={()=> this.props.payBill(bill)}>Mark as paid</b>
                                                </button>
                                        </div>
                                </div>
                                        )

                        }
                </div>
                </TabContainer>}
                {value === 1 &&
                <TabContainer><div className="card-columns" onClick={()=> this.props.getPaidBills()}>
                        {

                                this.props.unpaidBills.map((bill,index)  =>

                                    <div className="card text-center" key={index}>
                                            <div className="card-body">
                                                    <h5 className="card-title">Bill Type: {bill.billType}</h5>
                                                    <p className="card-text">Bill Name: {bill.billName}</p>
                                                    <p className="card-text">Bill Amount: <b>{bill.bill_amount}</b></p>
                                            </div>
                                    </div>
                                )

                        }
                </div></TabContainer>}


        </div>


</div>
                );
        }
}

BillsContent.propTypes = {
        classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(BillsContent);
