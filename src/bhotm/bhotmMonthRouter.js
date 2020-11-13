import MonthPage from "./bhotmMonthRouter/bhotmMonthPage";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function BhotmEntryRouter() {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/new`}>New month</Route>
            <Route path={`${path}/:monthId/edit`}>Edit month formgo</Route>
            <Route path={`${path}/:monthId`} component={MonthPage}></Route>
        </Switch>
    );
}