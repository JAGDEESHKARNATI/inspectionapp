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
            inspectionItemTypes:[],
            inspectionResult: {},
            nextDisabled:true
        }
    }

    componentDidMount(){
        console.log("didMount")
        fetch('http://www.mocky.io/v2/5b97533d30000070000bd533')
        .then((response)=>response.json())
        .then((result)=>{
            this.setState({
                inspectionItemTypes:result.data
            })
        })
        .catch((err)=>{
            Alert.alert("Error to load inspection items. Please try again later")
        })
    }

    onNext = async () => {
        //send data to redux
        Alert.alert("You're about to submit data to redux :" + JSON.stringify(this.state.inspectionResult)) 
        store.dispatch(saveInspection(this.state.inspectionResult))
    }

    onInspectionResultChange = (inspectionResult) => {
        //console.log(JSON.stringify(inspectionResult))
        var lastItem=inspectionResult.inspectionItems[this.state.inspectionItemTypes.length-1]

        if((inspectionResult.inspectionItems.length==this.state.inspectionItemTypes.length) 
        && (lastItem.inspectionResult != "" && lastItem.fixedOnSite != "" && lastItem.postInspectionWorkReq != "" && lastItem.workOrderNumber != "")){
            this.setState({
                inspectionResult,
                nextDisabled:false
            })
        }
        else
        {
            this.setState({
                inspectionResult,
                nextDisabled:true
            })
        }
        
    }

    render() {
        return (
            <Container>
                <AppHeader title="Inspection Result" onNext={this.onNext} nextDisabled={this.state.nextDisabled} inspectionItemTypes={this.state.inspectionItemTypes}/>
                <InspectionResult onInspectionResultChange={this.onInspectionResultChange} inspectionItemTypes={this.state.inspectionItemTypes}/>
            </Container>
        );
    }
}

export default App;