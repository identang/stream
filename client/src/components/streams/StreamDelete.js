import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../action";

class StreamDelete extends React.Component{
    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const id = this.props.match.params.id;
    // We have an extra div between the Action div and the buttons
    // React.Fragment is not going to render any elements to the screen
    // Takes no space, but it can wrap two elements into a single tag
        return(
            // <React.Fragment> shortened into <> (some tools think it is an error)
            <>
                <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to = "/" className="ui button">Cancel</Link>
            </>
            // </React.Fragment> shortened into </> (some tools think it is an error)
        );
    }
    renderContent() {
        if (!this.props.stream){
            return "Are you sure you want to delete this stream?"
        }
        return `Are you sure you want to delete the stream with title : ${this.props.stream.title}?`
    }

    render() {
        return(
            <Modal
                title = "Delete Stream"
                content = {this.renderContent()}
                //we add () to call the function
                // without the (), we are just referencing it
                actions = {this.renderActions()}
                onDismiss = {()=>history.push("/")} 
            />

        );
    }
}

// ownProps allows us to look at the match prop and pull out the id
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect( mapStateToProps, { fetchStream,deleteStream })(StreamDelete);