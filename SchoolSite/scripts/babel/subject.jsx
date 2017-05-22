class SubjectData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],   // Дані
            count: 0,   // Наявна кількість
            title: '',
            titleMess: '',
            popupClassName: 'invisible-pop-up', // назва попапу - покищо....
            popupParentClassName: '' // назва батька попапу - покищо....
        };

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.changePopUpState = this.changePopUpState.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.changeInputTitle = this.changeInputTitle.bind(this);
        this.setLoadAnim = this.setLoadAnim.bind(this);

        this.updateDataOnPage(feed.DEFAULT_TAKE);
    }

    setLoadAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    saveData() {
        self = this;

        self.setState({
            titleMess: ''
        });

        if (self.state.title === "") {
            self.setState({
                titleMess: 'Title is Empty!'
            });

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

                            self.updateDataOnPage(1);
                            self.changePopUpState();
                        });
    }

    updateDataOnPage(take) {
        self = this;
        this.setLoadAnim(true);
        var skip = (take >= 0 ? this.state.count : this.state.count + take);

        if (skip != 0 && skip % feed.DEFAULT_TAKE == 0 &&
            take != feed.DEFAULT_TAKE && take != feed.DEFAULT_REMOVE) {
            self.setLoadAnim(false);
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
                            self.setLoadAnim(false);
                        },
                        function () {
                            self.setLoadAnim(false);
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
                            self.updateDataOnPage(feed.DEFAULT_REMOVE);
                        });
    }

    changePopUpState(subject) {
        this.setState({ title: subject ? subject.Title : "", edit: subject });

        if (this.state.popupClassName === "invisible-pop-up") {
            this.setState({ popupClassName: "visible-pop-up", popupParentClassName: "background-pop-up" });
        }
        else {
            this.setState({ popupClassName: "invisible-pop-up", popupParentClassName: "" });
        }
    }

    changeInputTitle(event) {
        this.setState({ title: event.target.value });
    }

    render() {
        return (
            <div className="contentFromReact">
                <PopUP state={this.state.loadPopUPClass} />
                <div>
                    <button className="btn-add" onClick={() => this.changePopUpState()}>Add Subject</button>
                </div>
               <div className="div-table">
                    <div className="div-row-head">
                        <div className="div-col-num">ID</div>
                        <div className="div-col">Title</div>
                        <div className="div-col-btn"></div>
                        <div className="div-col-btn"></div>
                    </div>
                   {this.state.data.map((subject) => <TableItem key={subject.Id} subject={subject } edit={self.changePopUpState} remove={self.removeData}  />)}
               </div>

            <div>
                <button className="btn-add" onClick={() => this.updateDataOnPage(feed.DEFAULT_TAKE)}>See more</button>
            </div>

                <div className={this.state.popupParentClassName}>
         <div className={this.state.popupClassName}>
                 <form className="input-form">
                     <div>
                         <label>
                             Title:
                                    <input type="text" onChange={this.changeInputTitle} value={this.state.title} placeholder="Enter the subject title..." />
                         </label>
                                <p className="error-mess">{this.state.titleMess}</p>
                     </div><hr />
                            <div>
                                <button type="button" className="btn-save" onClick={() => this.saveData()}>Save</button>
                                <button type="button" className="btn-cancel" onClick={() => this.changePopUpState()}>Cancel</button>
                            </div>
                 </form>
         </div>
                </div>
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