import BhotmEntry from "../shared/bhotmEntry";
import EditDeleteButtons from "../shared/editDeleteButtons";
import React from "react";
import { showPageError } from "../../utils/helpers";
import { getMonth } from "../api/bhotmMonthApi";

// Fully rendered page displaying a whole month of BHotM

class MonthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthLoaded: false,
            month: null,
        };
    }
    // Load the data
    componentDidMount() {
        getMonth(this.props.match.params.monthId)
            .then((res) => {
                res.submissions.sort((a, b) => a.place - b.place);
                if (res.isBhoty) {
                    res.submissions.sort((a, b) => b.bhotyPlace - a.bhotyPlace);
                }
                this.setState({
                    monthLoaded: true,
                    month: res,
                });
            })
            .catch((error) => {
                showPageError(error, this.props.history);
            });
    }

    render() {
        if (this.state.monthLoaded) {
            // Set some page variables
            document.title = `${this.state.month.month} - BHotM - The Broumvirate`;
            const total = this.state.month.submissions.length;

            // Generate entries
            const entries = this.state.month.submissions.map((el, i) => (
                <div className="mt-5" key={el._id}>
                    <BhotmEntry
                        entry={el}
                        total={total}
                        mode={this.state.month.isBhoty ? "bhoty" : "month"}
                        unjudged={!this.state.hasBeenJudged}
                    />
                </div>
            ));

            return (
                <div className="container mt-4">
                    {/* Header */}
                    <h1 className="text-center display-3">
                        {this.state.month.month}
                    </h1>
                    <h4 className="text-center">
                        Ben Hagle of the{" "}
                        {this.state.month.isBhoty ? "Year" : "Month"}
                    </h4>
                    {this.state.month.judge ? (
                        <h4 className="text-center">
                            Judged by {this.state.month.judge}
                        </h4>
                    ) : null}
                    {this.state.month.notes ? (
                        <p className="text-center mt-2">
                            {this.state.month.notes}
                        </p>
                    ) : null}

                    {entries}

                    <EditDeleteButtons
                        context="Month"
                        editEndpoint={`/bhotm/month/${this.state.month._id}/edit`}
                        deleteEndpoint={`/api/bhotm/month/${this.state.month._id}`}
                        redirect="/bhotm/admin"
                        history={this.props.history}
                    />
                </div>
            );
        } else {
            return <div className="container mt-4"></div>;
        }
    }
}

export default MonthPage;