import React from 'react';
import { GeneratorButton } from './GeneratorButton';

class GreekNameGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            purpose: "", 
            gender: "Male", 
            lastNames: {}, 
            selectedLastName: "",
            loading: false
        };
        this.generateName = this.generateName.bind(this);
        this.handleNameFieldInput = this.handleNameFieldInput.bind(this);
        this.handleGenderSelection = this.handleGenderSelection.bind(this);
        this.postGeneratedName = this.postGeneratedName.bind(this);
        this.getLastNames = this.getLastNames.bind(this);
        this.handleLastNameSelection = this.handleLastNameSelection.bind(this);
    }

    postGeneratedName(name, meaning, gender, purpose) {
        fetch(`/api/greekNames?name=${name}&meaning=${meaning}&gender=${gender}&purpose=${purpose}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"name": name, "meaning": meaning, "gender": gender, "purpose": purpose})
        })
            .then((res) => {
                console.log(res);
                this.getGeneratedNames();
            })
    }

    postGeneratedNameLastName(name, lastName, lastMeaning, meaning, gender, purpose) {
        fetch(`/api/greekNames/${lastName}?name=${name}&meaning=${meaning}&gender=${gender}&purpose=${purpose}&lastmeaning=${lastMeaning}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({"name": name, "meaning": meaning, "gender": gender, "purpose": purpose, "lastname": lastName, "lastMeaning": lastMeaning})
        })
    }

    getLastNames() {
        this.setState({ loading: true });
        fetch('/api/greekLastNames')
            .then((res) => res.json())
            .then((data) => {
                if(data.rowCount > 0) {
                    let lastnames = {}
                    data.rows.map((row) => lastnames[row.lastname] = row);
                    this.setState({ lastNames: lastnames, loading: false });
                }
                else {
                    this.setState({ lastNames: {}, loading: false });
                }
            })
    }

    generateName() {
        if ((this.state.purpose==="") || (this.state.gender === "")) {
            console.log("Please select a purpose");
        }
        else {
            this.setState({ loading: true });
            fetch('/api/greekNames/new')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    let generated = false;
                    while (!generated) {
                        const generatedName = data[Math.floor(Math.random() * data.length)]
                        console.log(generatedName);
                        if (this.state.gender !== "Non-binary") {
                            if (generatedName.gender === this.state.gender) {
                                if (this.state.selectedLastName === "") {
                                    this.postGeneratedName(generatedName.name, generatedName.meaning, this.state.gender, this.state.purpose);
                                }
                                else {
                                    this.postGeneratedNameLastName(generatedName.name, 
                                        this.state.lastNames[this.state.selectedLastName].lastname, 
                                        this.state.lastNames[this.state.selectedLastName].meaning, 
                                        generatedName.meaning, 
                                        this.state.gender, 
                                        this.state.purpose
                                        );
                                }
                                this.setState({ loading: false })
                                generated = true;
                            }
                        }
                        else {
                            if (this.state.selectedLastName === "") {
                                this.postGeneratedName(generatedName.name, generatedName.meaning, this.state.gender, this.state.purpose);
                            }
                            else {
                                this.postGeneratedNameLastName(generatedName.name, 
                                    this.state.lastNames[this.state.selectedLastName].lastname, 
                                    this.state.lastNames[this.state.selectedLastName].meaning, 
                                    generatedName.meaning, 
                                    this.state.gender, 
                                    this.state.purpose
                                    );
                            }
                            this.setState({ loading: false })
                            generated = true;
                        }
                    }
                })
                .then(() => this.props.toggleRecentlyGenerated());
        }
    }

    handleNameFieldInput(e) {
        this.setState({
            purpose: e.target.value
        });
    }

    handleGenderSelection(e) {
        this.setState({
            gender: e.target.value
        });
    }

    handleLastNameSelection(e) {
        this.setState({ selectedLastName: e.target.value });
    }

    componentDidMount(e) {
        this.getLastNames();
    }

    render() {
        return (
            <div className="greekNameGenerator">
                <input type="text" id="namePurpose" name="namePurpose" placeholder="Purpose of name..." onChange={ this.handleNameFieldInput }></input>
                <select className="Selector" id="genderSelector" name="genderSelector" onChange={ this.handleGenderSelection }>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                </select>
                <select className="Selector" id="lastNameSelectorDD" name="lastNameSelector" onChange={ this.handleLastNameSelection }>
                    <option value=""> -- Please choose a last name -- </option>
                    {Object.keys(this.state.lastNames).map((row) => (
                        <option value={ this.state.lastNames[row].lastname } key={ this.state.lastNames[row].lastname }>{ this.state.lastNames[row].lastname }</option>
                    ))}
                </select>
                <GeneratorButton onClick={ this.generateName } loading={ this.state.loading }></GeneratorButton>
            </div>
        );
    }
}

export default GreekNameGenerator;