import React from "react";
import ReactDOM from "react-dom";

// Portal: let the component to be the child component of some components with higher piority
// the onClick function can be stopped by .stopPropagation
const Modal = props => {
    return ReactDOM.createPortal(
        <div 
        onClick={props.onDismiss}
        className= "ui dimmer modals visible active"
        >
            <div onClick= {e=>e.stopPropagation()}className= "ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        //second argument (Get reference to the div of the index.html with the id #modal)
         document.querySelector("#modal")
    )
}

export default Modal;