import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../action";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
    // Every component needs to fetch its own data
    componentDidMount() {
        this.props.fetchStreams();
    }

    // Render the list out when as an individual item
    renderList() {
        return this.props.streams.map(stream => {
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className =  "large middle aligned icon camera" />
                    <div className= "content">
                        <Link to={`/streams/${stream.id}`} className = "header">{stream.title}</Link>
                        <div className= "description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }
    // Show the Edit and Delete button when the currentUser === to the stream creator
    renderAdmin(stream) {
        if (this.props.currentUserId === stream.userId){
            return (
                <div className= "right floated content">
                    <Link to={`/streams/edit/${stream.id}`}className="ui button primary">Edit</Link>
                    <Link to ={`/streams/delete/${stream.id}`} className= "ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }
    
    // Direct the user to create a new stream
    renderCreate() {
        if (this.props.isSignedIn){
            return (
                // Shift the button to the right handside
                <div style={{textAlign: "right"}}>
                    <Link to ="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
       return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
       );
    }
}


// Map the state to props before you want to use it/ display it on JSX
const mapStateToProps = (state) => {
    //Object.value is a built in js syntax
    // Take an object as an argument --> turns that into an array
    return { 
        // Object.values() returns an array of values inside the object
        streams: Object.values(state.streams),
        currentUserId : state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);