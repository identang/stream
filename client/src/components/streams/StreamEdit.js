import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
// Make request to our api and update some stream
import { fetchStream, editStream } from "../../action"
import StreamForm from "./StreamForm"

// React-Router-DOM automatically pass props to the component
// Because it is rendered by a route component in App.js
class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
// formValues are something that are supposed to update/change
// Suppose it only contains the values that we want to change (without id)
// redux form expects us to have a field for each form value
    onSubmit = formValues => {
       this.props.editStream(this.props.match.params.id,formValues);
    };

    render() {
        if (!this.props.stream){
            return <div>Loading...</div>
        }
// initialValue is a special property name for redux-form
// With the format of the names of the field in StreamForm
// the Field would see whether the parent component has the property with the same name as the field name
// this.props.stream contains the fields of title and description of the stream
// _.pick() helps us to pick specific object values from this.props.stream
        return (
            <div>
                <h3>Edit a stream</h3>
                <StreamForm 
                    initialValues= {_.pick(this.props.stream,"title","description")}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

// Make use of the props from the components directly
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);