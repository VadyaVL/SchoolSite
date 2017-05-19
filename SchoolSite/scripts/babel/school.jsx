class SchoolData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            count: 0,
            name: '',
            nameMess: '',
            popupClassName: 'invisible-pop-up',
            popupParentClassName: ''
        };

        this.saveData = this.saveData.bind(this);
        this.removeData = this.removeData.bind(this);


        this.getRows = this.getRows.bind(this);


        this.changePopUpState = this.changePopUpState.bind(this);
        this.updateDataOnPage = this.updateDataOnPage.bind(this);

        this.changeInputName = this.changeInputName.bind(this);

        this.updateDataOnPage(0);
    }

    saveData() {
        self = this;

        self.setState({
            nameMess: ''
        });

        if (self.state.name === '') {
            self.setState({
                nameMess: 'Name is Empty!'
            });

            return;
        }

        ajax.callAjax('/School/PostSchool',
                        {
                            Id: self.state.edit ? self.state.edit.Id : 0,
                            Name: self.state.name
                        },
                        function () {
                            if (self.state.count % 10 != 0 || self.state.count == 0) {
                                self.setState({
                                    count: self.state.count + 1
                                });
                            }
                            self.updateDataOnPage(0);
                            self.changePopUpState();
                        });
    }

    updateDataOnPage() {
        self = this;
        var skip = this.state.count;
        ajax.callAjax('/School/JSON_School',
                        {
                            skip: skip,
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
                        });
    }

    removeData(school) {
        self = this;
        ajax.callAjax('/School/RemoveSchool',
                        {
                            id: school.Id
                        },
                        function () {
                            self.updateDataOnPage();
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

    getRows(schools) {
        return schools.map((school) =>
                        <div className='div-row' key={school.Id}>
                        <div className='div-col-num'>{school.Id}</div>
                        <div className='div-col'>{school.Name}</div>
                        <div className='div-col-btn'><button className='btn-edit' onClick={() => this.changePopUpState(school)}>Edit</button></div>
                        <div className='div-col-btn'><button className='btn-remove' onClick={() => this.removeData(school)}>Remove</button></div>
            </div>
        );
    }

    render() {
        self = this;
       
        return (
            <div className='contentFromReact'>
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
                   {this.getRows(this.state.data)}
               </div>

                <div>
                    <button className='btn-more' onClick={() => this.updateDataOnPage()}>See more</button>
                </div>
                
                <div className={this.state.popupParentClassName}>{/*class* {this.STARTE.OPENEDPOPUP ? */}
                    <div className={this.state.popupClassName}>
                            <form className='input-form'>
                                <div>
                                    <label>
                                        Name:
                                        <input type='text' onChange={this.changeInputName} value={this.state.name} placeholder='Enter the school name...' />
                                    </label>
                                    <p className='errorMess'>{this.state.nameMess}</p>
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

ReactDOM.render(<SchoolData />, document.getElementById('content'));