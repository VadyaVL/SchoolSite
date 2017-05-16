class SubjectData extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            title: '',
            statePopUP: "invisible-pop-up"
        };
        
        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.getRows = this.getRows.bind(this);
        this.changeStatePopUP = this.changeStatePopUP.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.changeInputTitle = this.changeInputTitle.bind(this);

        this.updateDataOnPage();
    }

    saveData() {
        self = this;
        ajax.makeAjax(  "http://localhost:2175/Subject/PostSubject",
                        {
                            id: self.state.edit ? self.state.edit.Id : 0,
                            title: self.state.title
                        },
                        function () {
                            self.updateDataOnPage();
                            self.changeStatePopUP();
                        });
    }

    updateDataOnPage() {
        self = this;
        ajax.makeAjax("http://localhost:2175/Subject/JSON_Subject",
                        { },
                        function (data) {
                            self.setState({ data: JSON.parse(data) });
                        });
    }

    removeData(subject) {
        self = this;
        ajax.makeAjax("http://localhost:2175/Subject/RemoveSubject",
                        {
                            id: subject.Id
                        },
                        function () {
                            self.updateDataOnPage();
                        });
    }

    changeStatePopUP(subject) {
        this.setState({ title: subject ? subject.Title : "", edit: subject });

        if (this.state.statePopUP === "invisible-pop-up") {
            this.setState({ statePopUP: "visible-pop-up" });
        }
        else {
            this.setState({ statePopUP: "invisible-pop-up" });
        }
    }

    changeInputTitle(event) {
        this.setState({ title: event.target.value });
    }

    getRows(subjects) {
        return subjects.map((subject) =>
            <div className="div-row" key={subject.Id}>
                <div className="div-col">{subject.Id}</div>
                <div className="div-col">{subject.Title}</div>
                <div className="div-col"><button className="btn-edit" onClick={() => this.changeStatePopUP(subject)}>Edit</button></div>
                <div className="div-col"><button className="btn-remove" onClick={() => this.removeData(subject)}>Remove</button></div>
            </div>
        );
                }
        
    render() {
        return (
            <div className="contentFromReact">
                <div>
                    <button className="btn-add" onClick={() => this.changeStatePopUP()}>Add Subject</button>
                </div><br />
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col">ID</div>
                        <div className="div-col">Title</div>
                        <div className="div-col"></div>
                        <div className="div-col"></div>
                    </div>
                    {this.getRows(this.state.data)}
        </div>

         <div className={this.state.statePopUP}>
                 <form className="input-form">
                     <div>
                         <label>
                            Title:
                                    <input type="text" onChange={this.changeInputTitle} value={this.state.title} placeholder="Enter the subject title..." />
                                </label>
                            </div><hr />
                            <div>
                                <button type="button" className="btn-save"      onClick={() => this.saveData()}>Save</button>
                                <button type="button" className="btn-cancel"    onClick={() => this.changeStatePopUP()}>Cancel</button>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SubjectData />, document.getElementById("data"));