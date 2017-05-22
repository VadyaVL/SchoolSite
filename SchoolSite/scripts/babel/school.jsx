class SchoolData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            count: 0,
            name: '',
            nameMess: '',
            loadPopUPClass: 'background-pop-up-off',
            popupClassName: 'invisible-pop-up',
            popupParentClassName: ''
        };

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);

        this.changePopUpState = this.changePopUpState.bind(this);

        this.updateDataOnPage = this.updateDataOnPage.bind(this);
        this.setLoadAnim = this.setLoadAnim.bind(this);
        this.changeInputName = this.changeInputName.bind(this);

        this.updateDataOnPage(feed.DEFAULT_TAKE);
    }

    

    saveData() {
        self = this;
        self.setState({  nameMess: '' });

        if (self.state.name === '') {
            self.setState({ nameMess: 'Name is Empty!' });
            return;
        }

        ajax.callAjax('/School/PostSchool',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            Name: self.state.name
                        },
                        function () {
                            if (self.state.edit) {
                                self.state.edit.Name = self.state.name;
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

        ajax.callAjax('/School/GetSchool',
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

    setLoadAnim(enable) {
        this.setState({ loadPopUPClass: enable ? 'background-pop-up' : 'background-pop-up-off' });
    }

    removeData(school) {
        self = this;
        ajax.callAjax('/School/RemoveSchool',
                        {
                            id: school.Id
                        },
                        function () {
                            var position = self.state.data.indexOf(school);
                            self.state.data.splice(position, 1);
                            self.updateDataOnPage(feed.DEFAULT_REMOVE);
                        });
    }

    changePopUpState(school) {
        this.setState({ name: school ? school.Name : '', edit: school });

        if (this.state.popupClassName === 'invisible-pop-up') {
            this.setState({ popupClassName: 'visible-pop-up', popupParentClassName: 'background-pop-up' });
        }
        else {
            this.setState({ popupClassName: 'invisible-pop-up', popupParentClassName: '' });
        }
    }

    changeInputName(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        self = this;
       
        return (
            <div className='contentFromReact'>
                <PopUP state={this.state.loadPopUPClass} />
                <div>
                    <button className='btn-add' onClick={() => this.changePopUpState()}>Add School</button>
                </div>

               <div className='div-table'>
                    <div className='div-row-head'>
                        <div className='div-col-num'>ID</div>
                        <div className='div-col'>Name</div>
                        <div className='div-col-btn'></div>
                        <div className='div-col-btn'></div>
                    </div>
                   {this.state.data.map((school) => <TableItem key={school.Id} school={school} edit={self.changePopUpState} remove={self.removeData} />)}
               </div>

                <div>
                    <button className='btn-more' onClick={() => this.updateDataOnPage(feed.DEFAULT_TAKE)}>See more</button>
                </div>
                

                <div className={this.state.popupParentClassName}>{/*class* {this.STARTE.OPENEDPOPUP ? */}
                    <div className={this.state.popupClassName}>
                            <form className='input-form'>
                                <div>
                                    <label>
                                        Name:
                                        <input type='text' onChange={this.changeInputName} value={this.state.name} placeholder='Enter the school name...' />
                                    </label>
                                    <p className='error-mess'>{this.state.nameMess}</p>
                                </div><hr />
                                <div>
                                    <button type='button' className='btn-save' onClick={() => this.saveData()}>Save</button>
                                    <button type='button' className='btn-cancel' onClick={() => this.changePopUpState()}>Cancel</button>
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
        var school = this.props.school;
        var edit = this.props.edit;
        var remove = this.props.remove;
        return (
            <div className='div-row'>
                <div className='div-col-num'>{school.Id}</div>
                <div className='div-col'>{school.Name}</div>
                <div className='div-col-btn'><button className='btn-edit' onClick={() => edit(school)}>Edit</button></div>
                <div className='div-col-btn'><button className='btn-remove' onClick={() => remove(school)}>Remove</button></div>
            </div>
        );
    }
}

ReactDOM.render(<SchoolData />, document.getElementById('content'));