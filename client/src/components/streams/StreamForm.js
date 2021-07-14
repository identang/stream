import React from "react";
//Field is a react component, so it is in capital
// reduxForm is a function
import { Field, formValues, reduxForm } from "redux-form";

class StreamForm extends React.Component{
// Helper method
// Receive fromProps from the field element
// Destructuring the props and use the input directly from meta
// Show the error message only when after the user has interacted with the element
    renderError({error, touched}){
        if (touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    // meta.touched --> the user has clicked into the field
    // destructure input, label and meta data out
    renderInput= ({input, label, meta})=>{
        // make the field appear red if their is an error (Styling)
        const classname = `field ${meta.error && meta.touched ? "error": ""}`
        //return an error if needed
        return (
            <div className={classname}>
                <label>{label}</label>
                <input {...input} autoComplete="off"
                    //onChange={fromProps.input.onChange}
                    //value={fromProps.input.value}
                />
                {this.renderError(meta)}
            </div>
        );
    }
    
    // we expect the parent component to pass down a callback called "onSubmit"
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render(){
        return(
            // the renderInput is customised to the element
            // call handleSubmit (callback) function of redux form 
            // pass the helper function into handleSubmit
            // give the form a classname of "error" to display the error
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label = "Enter title"/>
                <Field name="description" component={this.renderInput} label= "Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
        //return an object, put a key value pair on the object w/ the name of the field and the error msg
        //return an empty object if no error
    if (!formValues.title){
        errors.title = "You must enter a title"
    }
    if (!formValues.description){
        errors.description= ("You must enter a description")
    }
    return errors;
}

//reduxForm is going to return a function
// Imediately call the function with StreamCreate/StreamEdit
export default reduxForm({
    form: "streamForm",
    // simplify validate:validate into just validate
    // const error will appear in the meta property of the input
    validate
})(StreamForm);

