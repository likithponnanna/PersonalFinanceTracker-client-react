import React from 'react'
import AdminUserService from "../service/AdminUserService";


class AddProductByAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.adminUserService = AdminUserService.getInstance()
        this.state = {
            name:'',
            bank:'',
            details:'',
            url:'',
            type:'',
            buttonNeeded: false,
            buttonClickNeeded:true,

        }

    }

    setAddUserForm = () => {
        this.setState({
                          buttonNeeded:this.state.buttonClickNeeded
                      })
    }

    addProduct = (prod) => {
        this.adminUserService.addProduct(prod)
            .then(
                () => this.setAddUserForm()
            )
    }

    nameChanged = event => {
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
                      })
    };

    typeChanged = event => {
        this.setState({
                          type: event.target.value
                      })
    };




    render () {

     return (

         <div>

             <h1> Enter the details </h1>

             <div>

                 <div className="form-group row">
                     <label htmlFor="name" className="col-sm-2">
                       Name
                     </label>
                     <div className="col-sm-10">
                         <input
                             className="form-control"
                             placeholder="name"
                             id="name"
                             onChange={this.nameChanged}
                         />
                     </div>
                 </div>

                 <div className="form-group row">
                     <label htmlFor="bank" className="col-sm-2">
                         Bank
                     </label>
                     <div className="col-sm-10">
                         <input
                             className="form-control"
                             placeholder="bank"
                             id="bank"
                             onChange={this.bankChanged}
                         />
                     </div>
                 </div>

                 <div className="form-group row">
                     <label htmlFor="details" className="col-sm-2">
                         Details
                     </label>
                     <div className="col-sm-10">
                         <input
                             className="form-control"
                             placeholder="details"
                             id="details"
                             onChange={this.detailsChanged}
                         />
                     </div>
                 </div>

                 <div className="form-group row">
                     <label htmlFor="url" className="col-sm-2">
                         URL
                     </label>
                     <div className="col-sm-10">
                         <input
                             className="form-control"
                             placeholder="url"
                             id="url"
                             onChange={this.urlChanged}
                         />
                     </div>
                 </div>

                 <div className="form-group row">
                     <label htmlFor="type" className="col-sm-2">
Type
                     </label>
                     <div className="col-sm-10">
                         <input
                             className="form-control"
                             placeholder="Enter SAVING/CHECKING/CREDIT_CARD"
                             id="type"
                             onChange={this.typeChanged}
                         />
                     </div>
                 </div>

                 <button type="button"
                         className="btn btn-outline-success"
                 onClick={() => {
                     this.addProduct(this.state)

                 }}>
                    ADD

                 </button>

             </div>


             {this.state.buttonNeeded === true &&
              <div className="alert alert-success" role="alert" id="alert">
                  You have successfully added product {this.state.name}
              </div>}


         </div>
     )

    }
}

export default AddProductByAdmin