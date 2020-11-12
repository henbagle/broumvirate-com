import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorHandler from "./components/errorHandling/errorHandler.js";
import BhotmEntryRouter from "./components/bhotmEntryRouter";
import BhotmMonthRouter from "./components/bhotmMonthRouter";
import BhotmIndexTemp from "./components/bhotmIndexTemp";

const PREFIX = "/bhotm/";

const BHotM = () => (
    <BrowserRouter>
        <ErrorHandler>
            <Switch>
                <Route exact path={PREFIX}>
                    <BhotmIndexTemp />
                </Route>
                <Route path={PREFIX + "entry"}>
                    <BhotmEntryRouter />
                </Route>
                <Route path={PREFIX + "month"}>
                    <BhotmMonthRouter />
                </Route>
                <Route path={PREFIX + "admin"}>
                    <div>BhotmAdmin</div>
                </Route>
                <Route path={PREFIX}>
                    <div>404</div>
                </Route>
            </Switch>
        </ErrorHandler>
    </BrowserRouter>
);

ReactDOM.render(<BHotM />, document.getElementById("app"));
