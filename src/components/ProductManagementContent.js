import React from 'react'
import AdminUserService from "../service/admin.service.client"
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import MyContext from './MyContext'

class ProductManagementContent extends React.Component{
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance();
        this.state = {
            name:'',
            bank:'',
            details:'',
            url:'',
            type:'CREDIT_CARD',
            productList:[],
            productToBeEdited: undefined,
            activeBtn: 'CREDIT_CARD',
            addUserFormNeeded: false,
            addUserForm: true,
            updateUserFormNeeded: false,
            editForm:true,

        }
    }


    componentDidMount() {
        this.adminUserService.findAllProducts()
            .then(products => {
                let newFilteredProd = [];
                for(let i=0; i<products.length;i++)
                {
                    if(products[i].type === "CREDIT_CARD" ) {
                        newFilteredProd.push(products[i])
                    }
                }
                this.setState({
                    productList:newFilteredProd
                })
            })
        console.log("Products", this.state.productList);

    }


    getCreditCards =() => {

        this.adminUserService.findAllProducts()
            .then(products => {console.log("Products", products);
                let newFilteredProd = [];
                for(let i=0; i<products.length;i++)
                {
                    if(products[i].type === "CREDIT_CARD" ) {
                        newFilteredProd.push(products[i])
                    }
                }
                this.setState({
                    productList:newFilteredProd
                })
            })

    }


    getSavingsAccounts =() => {

        this.adminUserService.findAllProducts()
            .then(products => {
                let newFilteredProd = [];
                for(let i=0; i<products.length;i++)
                {
                    if(products[i].type === "SAVING" ) {
                        newFilteredProd.push(products[i])
                    }
                }
                this.setState({
                    productList:newFilteredProd
                })
            })

    }

    getCheckingAccounts =() => {

        this.adminUserService.findAllProducts()
            .then(products => {
                let newFilteredProd = [];
                for(let i=0; i<products.length;i++)
                {
                    if(products[i].type === "CHECKING" ) {
                        newFilteredProd.push(products[i])
                    }
                }
                this.setState({
                    productList:newFilteredProd
                })
            })

    }



    toggleAddUSer = () => {
        this.setState({
            addUserFormNeeded: !this.state.addUserFormNeeded
        })
    };



    createProduct = () => {
        if(this.state.name!==""|| this.state.bank !=="" || this.state.details !=="" || this.state.url !=="" || this.state.type !=="") {

            let newProduct = {
                name: this.state.name,
                bank: this.state.bank,
                details: this.state.details,
                url: this.state.url,
                type: this.state.type
            };

            console.log("Create Product", newProduct);

            this.adminUserService.createProduct(newProduct)
                .then(product =>{
                    if(this.state.type==="CREDIT_CARD"){
                        this.getCreditCards()
                    }else if(this.state.type==="SAVING"){
                        this.getSavingsAccounts()
                    }else {
                        this.getCheckingAccounts()
                    }


                    console.log("Create Product", this.state.type);
                   /* this.setState({
                        productList : this.state.productList.push(product)
                })*/
                    }
                )

        }else {
            alert("Fields cannot be left empty");
        }

    };

    updateProduct = () =>{


        let newProduct = {
            _id: this.state.productToBeEdited._id,
            name: this.state.name,
            bank: this.state.bank,
            details: this.state.details,
            url: this.state.url,
            type: this.state.type
        }


        this.adminUserService.updateProduct(newProduct).then(
            response =>{  this.setState({
                productList: this.state.productList.map(product =>
                    product._id === newProduct._id ? newProduct : product,
                )
            })  }
        );
    };


    deleteProduct = (productId) =>{
        this.adminUserService.deleteProduct(productId)
            .then(response =>{
                this.setState({
                    productList :  this.state.productList.filter(product => product._id !== productId) })
                })

    };


    toggleUpdateForm = () => {
        this.setState({
            updateUserFormNeeded: !this.state.updateUserFormNeeded
        })
    };

    setProductToBeEdited=  (product) => {

        this.setState({
            productToBeEdited:product,
            name: product.name,
            bank: product.bank,
            details: product.details,
            url: product.url,
            type: product.type

        })
    };



    productNameChanged = event => {
        this.setState({
            name: event.target.value
        })
    };

    bankChanged = event => {
        this.setState({
            bank: event.target.value
        })
    };

    detailsChanged = event => {
        this.setState({
            details: event.target.value
        })
    };

    urlChanged = event => {
        this.setState({
            url: event.target.value
        });
    };

    typeChanged = event => {
        this.setState({
            type: event.target.value
        });
    };




    setActiveBtn = (btn) => {

        if(btn==='CREDIT-CARD') {
            this.setState({
                activeBtn: btn,
                type: btn
            })
        }else if(btn==='SAVING'){
            this.setState({
                activeBtn: btn,
                type: btn
            })
        }else {
            this.setState({
                activeBtn: btn,
                type: btn
            })
        }
    }



    render () {

        return (
            <div className="container web-dev-overflow p-0">
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                            <div className="wrapper container web-dev-overflow p-0">


                                <div className="card col-12 web-dev-overflow p-0">

                                    <h5 className="card-header text-center font-weight-bold text-uppercase py-4">Product Editor</h5>

                                    <div className="card-body web-dev-overflow">
                                        <div id="table" className="table-editable">
                                            <table
                                                className="table  table-responsive-md table-striped text-center ">
                                                <tr>
                                                    <button onClick={()=>{ this.setActiveBtn('CREDIT_CARD');this.getCreditCards() }} className={` mr-2 ${this.state.activeBtn==='CREDIT-CARD' ? 'btn-secondary' : 'btn-outline-secondary'} `}>
                                                        Credit Cards
                                                    </button>
                                                    <button onClick={()=>{ this.setActiveBtn('SAVING'); this.getSavingsAccounts()} } className={`ml-2 mr-1 ${this.state.activeBtn==='SAVINGS' ? 'btn-secondary' : 'btn-outline-secondary'} `} >
                                                        Savings Accounts
                                                    </button>
                                                    <button onClick={()=>{ this.setActiveBtn('CHECKING'); this.getCheckingAccounts()} } className={`ml-2 mr-1 ${this.state.activeBtn==='CHECKING' ? 'btn-secondary' : 'btn-outline-secondary'} `} >
                                                        Checking Accounts
                                                    </button>
                                                </tr>
                                            </table>



                                            <span className="table-add float-right mb-3 mr-2 " onClick={()=> this.toggleAddUSer()}><a href="#!" className="text-success">
                                              <i className="fa fa-plus" aria-hidden="true"/></a></span>

                                            <table
                                                className="table table-bordered table-responsive-md table-striped text-center ">

                                                <tr>
                                                    <th className="text-center">Product Name</th>
                                                    <th className="text-center">Bank Name</th>
                                                    <th className="text-center">Details</th>
                                                    <th className="text-center">Product Image Link</th>
                                                    <th className="text-center">Product Type</th>
                                                    <th className="text-center"> </th>
                                                    <th className="text-center"> </th>
                                                </tr>

                                                {this.state.updateUserFormNeeded &&    <tr>
                                                    <td className="pt-3-half"  ><input value={this.state.name} type="text" onChange={(event)=>this.productNameChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input value={this.state.bank} type="text" onChange={(event)=>this.bankChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={this.state.details} type="text"  onChange={(event)=>this.detailsChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input value={this.state.url} type="text" onChange={(event)=>this.urlChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input disabled='disabled' value={this.state.type} type="text"  onChange={(event)=>this.typeChanged(event)}/></td>


                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn btn-danger btn-rounded btn-sm my-0" onClick={()=>{ this.toggleUpdateForm(); this.updateProduct() }}>Update</button></span>
                                                    </td>

                                                </tr>}


                                                {this.state.addUserFormNeeded && <tr>
                                                    <td className="pt-3-half"  ><input type="text"  onChange={(event)=>this.productNameChanged(event)}/> </td>
                                                    <td className="pt-3-half"  ><input type="text" onChange={(event)=>this.bankChanged(event)}/> </td>
                                                    <td className="pt-3-half" ><input type="text" onChange={(event)=>this.detailsChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input type="text" onChange={(event)=>this.urlChanged(event)}/></td>
                                                    <td className="pt-3-half" ><input disabled='disabled' type="text" value={this.state.type}/></td>

                                                    <td className="pt-3-half">
                                                      <span className="table-remove"><button type="button"
                                                                                             className="btn btn-success btn-rounded btn-sm my-0" onClick={()=>{ this.toggleAddUSer(); this.createProduct()}}>Add</button></span>
                                                    </td>
                                                    <td>
                                                        <span className="table-remove"><button type="button"
                                                                                               className="btn  btn-rounded btn-sm my-0"> </button></span>
                                                    </td>

                                                </tr>
                                                }

                                                {

                                                    this.state.productList.map((product,index)  =>
                                                            <tr key={index}>
                                                                <td className="pt-3-half" >{product.name}</td>
                                                                <td className="pt-3-half" >{product.bank}</td>
                                                                <td className="pt-3-half" >{product.details}</td>
                                                                <td className="pt-3-half" ><img src={product.url} className="web-dev-image-responsive"  alt="Product Image"/></td>
                                                                <td className="pt-3-half" >{product.type}</td>
                                                                <td className="pt-3-half">
                                                                    { this.state.addUserFormNeeded===true || this.state.updateUserFormNeeded===true ? <div/>:
                                                                        <span className="table-remove" ><i onClick={()=>{ this.toggleUpdateForm(); this.setProductToBeEdited(product)}}  className="fa fa-edit fa-2x" aria-hidden="true"/></span>
                                                                    }

                                                                </td>
                                                                <td>
                                                                    { this.state.addUserFormNeeded===true || this.state.updateUserFormNeeded===true ? <div/>:
                                                                        <span className="table-trash">
                                                        <i onClick={()=> this.deleteProduct(product._id)} className="fa fa-trash fa-2x " aria-hidden="true"/>
                                                    </span>}
                                                                </td>

                                                            </tr>
                                                    )

                                                }






                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>





                        </React.Fragment>
                    )}
                </MyContext.Consumer>

            </div>
        )
    }

}
ProductManagementContent.contextType = MyContext;
export default ProductManagementContent



