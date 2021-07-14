import React from "react";
// flv downloads the video stream and converts into some files that can be played inside a normal HTML player
// something like axios
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../action";

class StreamShow extends React.Component{

    //When we need to interact with some individual elements inside the DOM. 
    //We need to create a Ref inside the constructor. 
    //Then, we will wire it up with an individual element by passing it as a Ref property.
    // Note: video tag is a JSX element, so we need to use the Ref system
    constructor(props){
        super(props);
        
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        // Destructuring id from this.props.match.params.id
        const { id } = this.props.match.params;
        this.props.fetchStream(id)
        this.buildPlayer();
        // We modify the script from "https://www.npmjs.com/package/flv.js"
    }

    // Second layer of rendering
    componentDidUpdate(){
        this.buildPlayer();
    }
    // Stop downloading the stream when we leave the page
    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream){
            return;
        }
        // Destructuring id from this.props.match.params.id
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type:"flv",
            url: `http://localhost:8000/live/${id}.flv`
        });
        // .current is inside the this.videoRef 
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load(); // load the player
    }

    render(){
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title,description } = this.props.stream;
        // inner {} means the general object
        // outer {} means we are going to pass in a js expression
        /* controls = "true", but we do not need to write it out 
        when we pass prop down to the child component */
        return (
            <div>
                <video ref={this.videoRef} style={{ width:"100%" }} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);