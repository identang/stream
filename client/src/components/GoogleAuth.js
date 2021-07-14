import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../action";

class GoogleAuth extends React.Component {
    componentDidMount() {
        // load gapi from on the window scope
        //get a reference to the "auth" object to see if the user alrd signed in
        window.gapi.load("client:auth2", () => { 
            //return a promise (notify you when it is loaded) when we call .init
            window.gapi.client.init({ // load up the client library (asyn operation)
                //initialize the client with client ID
                clientId:
                "272797599365-0bfklgv1004bcm1mh70llm9j67tcs0ho.apps.googleusercontent.com" ,
                scope: "email"
            }).then(()=>{ //chain with .then callback statement, automatically invoked when the data is loaded
                //this.auth get reference to the authentication status
                 this.auth = window.gapi.auth2.getAuthInstance()
                 // update the auth state inside the redux store
                 this.onAuthChange(this.auth.isSignedIn.get())
                 //listen function is inside the prototype
                 //invoke when something has changed
                 this.auth.isSignedIn.listen(this.onAuthChange)
            });
        }); 
    }

    onAuthChange = (isSignedIn) => {
       if (isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId());
       } else {
           this.props.signOut();
       }
    }
    
    onSignInClick = () => {
        //pass in the userId to the action
        this.auth.signIn(); 
    }; 

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if  (this.props.isSignedIn===null){
            return <div>i don't know it we are signed in</div>
        } else if (this.props.isSignedIn){
            return (
            <button onClick= {this.onSignOutClick} className="ui red google button">
                <i className = "google icon" />
                Sign Out
            </button>
                )
        } else {
            return (
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className = "google icon" />
                Sign In with Google
            </button>
            )
        }
    }

    render () {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);