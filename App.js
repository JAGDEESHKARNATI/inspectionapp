import React from 'react';
import { Container } from 'native-base';
import InspectionResult from './components/InspectionResult'
import AppHeader from './components/AppHeader'
import { Alert } from "react-native"

import {
  store,
  saveInspection
} from './redux_inspection'



class App extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Inspection Result'
    };

    constructor() {
        super();

        this.state = {
            inspectionResult: {}
        }
    }

    onNext = async () => {
        //send data to redux
        Alert.alert("You're about to submit data to redux :" + JSON.stringify(this.state.inspectionResult)) 
        store.dispatch(saveInspection(this.state.inspectionResult))
    }

    onInspectionResultChange = (inspectionResult) => {
        //console.log(JSON.stringify(inspectionResult))
        this.setState({
            inspectionResult
        })
    }

    render() {
        return (
            <Container>
                <AppHeader title="Inspection Result" onNext={this.onNext} />
                <InspectionResult onInspectionResultChange={this.onInspectionResultChange}/>
            </Container>
        );
    }
}

export default App;