import React from "react";
// Cannot pass the browserRouter
import { Router,Route, Switch } from "react-router-dom";
import  StreamCreate  from "./streams/StreamCreate";
import  StreamList  from "./streams/StreamList";
import  StreamDelete from "./streams/StreamDelete";
import  StreamEdit  from "./streams/StreamEdit";
import  StreamShow  from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";


//"exact" means the exact "/"path, but not including "/"
const App = () => {
    return (
        //Listen to the "history" for changes to the URL
        // Still show the stream edit component after adding an ID
        // ":" after the stream/edit/ is the magic key, "id" can be anything
        // We can check it from the props.match.params of the component
        // "Switch" can limit the router from only showing one route at a time
        // Avoid the webpage misunderstand /streams/new is one of the /streams/:id
        <div className="ui container">
            <Router history={history}>
                <div>
                <Header />
                    <Switch>
                        <Route path = "/" exact component={StreamList} />
                        <Route path = "/streams/new" exact component={StreamCreate} />
                        <Route path = "/streams/edit/:id" exact component={StreamEdit} />
                        <Route path = "/streams/delete/:id" exact component={StreamDelete} />
                        <Route path = "/streams/:id" exact component={StreamShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;