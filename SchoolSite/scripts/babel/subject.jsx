class SubjectData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   count: 0,
            title: '', errorTitle: '', titleMess: 'Title is Empty!',
            loadPopUPClass: 'background-pop-up-off',
            inputPopUPClass: 'background-pop-up-off'
        };

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.updatePageData = this.updatePageData.bind(this);
        this.setPopUPForm = this.setPopUPForm.bind(this);
        this.setPopUPAnim = this.setPopUPAnim.bind(this);

        this.changeInputTitle = this.changeInputTitle.bind(this);

        this.updatePageData(feed.DEFAULT_TAKE);
    }

    setPopUPAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    saveData() {
        self = this;

        if (self.state.title === "") {
            self.setState({ errorTitle: 'tooltip' });

            return;
        }

        ajax.callAjax("/Subject/PostSubject",
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            Title: self.state.title
                        },
                        function () {
                            if (self.state.edit) {
                                self.state.edit.Title = self.state.title;
                            }

                            self.updatePageData(1);
                            self.setPopUPForm();
                        });
    }

    updatePageData(take) {
        this.setPopUPAnim(true);

        self = this;
        var skip = (take >= 0 ? this.state.count : this.state.count + take);

        if (skip != 0 && skip % feed.DEFAULT_TAKE == 0 &&
            take != feed.DEFAULT_TAKE && take != feed.DEFAULT_REMOVE) {
            self.setPopUPAnim(false);
            return;
        }

        if (take == feed.DEFAULT_REMOVE) {
            take = feed.DEFAULT_TAKE - skip % feed.DEFAULT_TAKE;
        }

        ajax.callAjax("/Subject/GetSubject",
                        {
                            skip: skip,
                            take: take
                        },
                        function (data) {
                            var jsonObj = JSON.parse(data);
                            var t = [];
                            if (skip == 0) {
                                var t = jsonObj.Items;
                            }
                            else {
                                var t = self.state.data.concat(jsonObj.Items);
                            }

                            self.setState({
                                count: jsonObj.Count,
                                data: t
                            });
                            self.setPopUPAnim(false);
                        },
                        function () {
                            self.setPopUPAnim(false);
                        });
    }

    removeData(subject) {
        self = this;
        ajax.callAjax("/Subject/RemoveSubject",
                        {
                            id: subject.Id
                        },
                        function () {
                            var position = self.state.data.indexOf(subject);
                            self.state.data.splice(position, 1);
                            self.updatePageData(feed.DEFAULT_REMOVE);
                        });
    }

    setPopUPForm(subject) {
        this.setState({ title: subject ? subject.Title : "", edit: subject, errorTitle: '' });

        if (this.state.inputPopUPClass === 'background-pop-up-off') {
            this.setState({ inputPopUPClass: 'background-pop-up' });
        }
        else {
            this.setState({ inputPopUPClass: 'background-pop-up-off' });
        }
    }

    changeInputTitle(event) {
        this.setState({ title: event.target.value });

        if (event.target.value != '') {
            self.setState({ errorTitle: '' });
        }
    }

    render() {
        return (
            <div className="contentFromReact">
                <PopUPLoader state={this.state.loadPopUPClass} />

                <div>
                    <button className="btn-add" onClick={() => this.setPopUPForm()}>Add Subject</button>
                </div>
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col-num">ID</div>
                        <div className="div-col">Title</div>
                        <div className="div-col-btn"></div>
                        <div className="div-col-btn"></div>
                    </div>
                   {this.state.data.map((subject) => <TableItem key={subject.Id} subject={subject } edit={self.setPopUPForm} remove={self.removeData}  />)}
               </div>

            <div>
                <button className="btn-add" onClick={() => this.updatePageData(feed.DEFAULT_TAKE)}>See more</button>
            </div>


            <PopUP state={this.state.inputPopUPClass}>
                 <form className="input-form">
                     <div>
                         <label>
                             Title:
                                <span className={this.state.errorTitle} data-title={this.state.titleMess}>
                                    <input type="text" onChange={this.changeInputTitle} value={this.state.title} placeholder="Enter the subject title..." />
                                </span>
                            </label>
                     </div>
                     <hr />
                    <div>
                        <button type="button" className="btn-save" onClick={() => this.saveData()}>Save</button>
                        <button type="button" className="btn-cancel" onClick={() => this.setPopUPForm()}>Cancel</button>
                    </div>
                 </form>
            </PopUP>
        </div>
        );
    }
}

class TableItem extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        var subject = this.props.subject;
        var edit = this.props.edit;
        var remove = this.props.remove;
        return (
            <div className="div-row">
                <div className="div-col-num">{subject.Id}</div>
                <div className="div-col">{subject.Title}</div>
                <div className="div-col-btn"><button className="btn-edit" onClick={() => edit(subject)}>Edit</button></div>
                <div className="div-col-btn"><button className="btn-remove" onClick={() => remove(subject)}>Remove</button></div>
            </div>
        );
    }
}

ReactDOM.render(<SubjectData />, document.getElementById("content"));