import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Select from 'react-select';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { Profiles } from '../api/resources/profiles';
import { Database } from '../api/resources/databases';
import { Editors } from '../api/resources/editors';
import { Languages } from '../api/resources/languages';
import { Frameworks } from '../api/resources/frameworks';

function mapSelect(i) {
    return { value: i._id, label: i.name };
}

const customStyles = {
    option: (base) => ({
        ...base,
        borderBottom: '1px dotted orange'
    })
};

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            database: {},
            language: {},
            framework: {},
            editor: {}
        }
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const opts = { sort: 'isPriority:desc' };
        Promise.all([
            Database.findAll(opts),
            Editors.findAll(opts),
            Frameworks.findAll(opts),
            Languages.findAll(opts),
        ]).then(results => {
            const [{ data: databases }, { data: editors }, { data: frameworks }, { data: languages }] = results;
            this.setState({
                databases: databases.map(mapSelect),
                editors: editors.map(mapSelect),
                frameworks: frameworks.map(mapSelect),
                languages: languages.map(mapSelect),
                loaded: true
            });
        }).catch(() => {
            this.toggleError(true);
        })
    }

    async onSend(event) {
        event.preventDefault();
        try {
            const body = {
                name: this.state.name,
                databaseId: this.state.database.value,
                languageId: this.state.language.value,
                frameworkId: this.state.framework.value,
                editorId: this.state.editor.value
            };
            const notValid = Object.values(body).findIndex(i => !Boolean(i)) !== -1;
            if (notValid) {
                this.toggleError(true, 'Por favor, rellena todos los campos');
            }
            await Profiles.create(body).then((result) => {
                const id = result.data._id;
                this.props.history.push(`/result/${id}`);
            })
        } catch (e) {
            this.toggleError(true)
        }
    }

    toggleError(showError, errorText) {
        this.setState({ showError, errorText });
    }

    render() {
        return (
            <div className="main">
                <Header></Header>
                <Snackbar
                    className="notification"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    message={ this.state.errorText || 'Ups, algo salió mal'}
                    open={this.state.showError}
                    autoHideDuration={6000} />
                <section className="content set-padding-3">
                    {this.state.loaded ?
                        <div className="main-content">
                            <div className="form-container">
                                <form className="form set-padding" autoComplete="off">
                                    <div className="form-fields">
                                        <legend>
                                            <b>¿Cuál es tu nombre?</b>
                                        </legend>
                                        <TextField
                                            required
                                            label=""
                                            onChange={e => this.setState({ name: e.target.value })}/>
                                    </div>
                                    <div className="form-fields">
                                        <legend>
                                            <b>¿Qué lenguaje de programación usas habitualmente?</b>
                                        </legend>
                                        <Select
                                            placeholder="Selecciona..."
                                            styles={customStyles}
                                            value={this.state.language}
                                            onChange={selected => this.setState({ language: selected })}
                                            options={this.state.languages}>
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{ opacity: 0, height: 0 }}
                                                    value={this.state.language.value}
                                                    required={true}/>
                                        </Select>
                                    </div>
                                    <div className="form-fields">
                                        <legend>
                                            <b>¿Qué framework utilizas con mayor frecuencia?</b>
                                        </legend>
                                        <Select
                                            placeholder="Selecciona..."
                                            styles={customStyles}
                                            value={this.state.framework}
                                            onChange={selected => this.setState({ framework: selected })}
                                            options={this.state.frameworks} />
                                    </div>
                                    <div className="form-fields">
                                        <legend>
                                            <b>¿Qué base de datos utilizas con mayor frecuencia?</b>
                                        </legend>
                                        <Select
                                            placeholder="Selecciona..."
                                            styles={customStyles}
                                            value={this.state.database}
                                            onChange={selected => this.setState({ database: selected })}
                                            options={this.state.databases} />
                                    </div>

                                    <div className="form-fields">
                                        <legend>
                                            <b>¿Qué editor de texto utilizas?</b>
                                        </legend>
                                        <Select
                                            placeholder="Selecciona..."
                                            styles={customStyles}
                                            value={this.state.editor}
                                            onChange={selected => this.setState({ editor: selected })}
                                            options={this.state.editors} />
                                    </div>
                                    <div className="set-padding-3 txt-align-c">
                                        <Button type='submit' onClick={this.onSend}>Enviar</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        : <Loader />}
                </section>
            </div>
        );
    }
}

export default Form;