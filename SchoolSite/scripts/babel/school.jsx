class SchoolData extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            count: 0,
            name: '',
            statePopUP: "invisible-pop-up",
            nameMess: ''
        };
        
        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.getRows = this.getRows.bind(this);
        this.changeStatePopUP = this.changeStatePopUP.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.changeInputName = this.changeInputName.bind(this);

        this.updateDataOnPage(true);
    }

    saveData() {
        self = this;

        self.setState({
            nameMess: ''
        });

        if (self.state.name === "") {
            self.setState({
                nameMess: 'Name is Empty!'
            });

            return;
        }

        ajax.makeAjax(  "http://localhost:2175/School/PostSchool",
                        {
                            id: self.state.edit ? self.state.edit.Id : 0,
                            name: self.state.name
                        },
                        function () {
                            if (self.state.count % 10 != 0) {
                                self.setState({
                                    count: self.state.count + 1
                                });
                            }
                            self.updateDataOnPage();
                            self.changeStatePopUP();
                        });
    }

    updateDataOnPage(toLoad) {
        self = this;
        ajax.makeAjax(  "http://localhost:2175/School/JSON_School",
                        {
                            get: Boolean(toLoad),
                            count: self.state.count
                        },
                        function (data) {
                            var jsonObj = JSON.parse(data);
                            self.setState({
                                count: jsonObj.Count,
                                data: jsonObj.Items
                            });
                        });
    }

    removeData(school) {
        self = this;
        ajax.makeAjax(  "http://localhost:2175/School/RemoveSchool",
                        {
                            id: school.Id
                        },
                        function () {
                            self.updateDataOnPage();
                        });
    }

    changeStatePopUP(school) {

        this.setState({ name: school ? school.Name : "", edit: school });

        if (this.state.statePopUP === "invisible-pop-up") {
            this.setState({ statePopUP: "visible-pop-up" });
        }
        else {
            this.setState({ statePopUP: "invisible-pop-up" });
        }
    }

    changeInputName(event) {
        this.setState({ name: event.target.value });
    }

    getRows(schools) {
        return schools.map((school) =>
            <div className="div-row" key={school.Id}>
                <div className="div-col">{school.Id}</div>
                <div className="div-col">{school.Name}</div>
                <div className="div-col"><button className="btn-edit" onClick={() => this.changeStatePopUP(school)}>Edit</button></div>
                <div className="div-col"><button className="btn-remove" onClick={() => this.removeData(school)}>Remove</button></div>
            </div>
        );
    }
        
    render() {
        return (
            <div className="contentFromReact">
                <div>
                    <button className="btn-add" onClick={() => this.changeStatePopUP()}>Add School</button>
                </div><br />
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col">ID</div>
                        <div className="div-col">Name</div>
                        <div className="div-col"></div>
                        <div className="div-col"></div>
                    </div>
                   {this.getRows(this.state.data)}
               </div><br />

                <div>
                    <button className="btn-add" onClick={() => this.updateDataOnPage(true)}>See more</button>
                </div><br />

                <div className={this.state.statePopUP}>
                        <form className="input-form">
                            <div>
                                <label>
                                    Name:
                                    <input type="text" onChange={this.changeInputName} value={this.state.name} placeholder="Enter the school name..." />
                                </label>
                                <p className="errorMess">{this.state.nameMess}</p>
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

ReactDOM.render(<SchoolData />, document.getElementById("data"));