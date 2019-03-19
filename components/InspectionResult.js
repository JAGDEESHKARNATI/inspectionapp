import React, { Component } from 'react';

import {
    FlatList,
    Alert
} from 'react-native'

import { Form, Item, Input,Content,Textarea,Picker,Icon } from 'native-base';
import InspectionItem from './InspectionItem'

class InspectionResult extends Component {
    constructor() {
        super();

        this.state = {
            inspectionItemTypes: [],
            ancillaryType:'',
            inspectionItems:[],
            comments:'',
            additionalWorks:''
        }
    }

    onChange=(fieldName,fieldValue)=>{
        this.setState({
            [fieldName]:fieldValue
        },()=>{
            this.props.onInspectionResultChange({
                ancillaryType:this.state.ancillaryType,
                inspectionItems:this.state.inspectionItems,
                comments:this.state.comments,
                additionalWorks:this.state.additionalWorks
            })
        })
    }

    onInspectionItemChange=(id,item)=>{
        this.setState({
            inspectionItems:[
                ...this.state.inspectionItems.filter((inspectionItem)=>{
                    return inspectionItem.id!=id;
                }),
                item
            ]
        },()=>{
            this.props.onInspectionResultChange({
                ancillaryType:this.state.ancillaryType,
                inspectionItems:this.state.inspectionItems,
                comments:this.state.comments,
                additionalWorks:this.state.additionalWorks
            })
        })
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item }) => {
        return (<InspectionItem item={item} onInspectionItemChange={this.onInspectionItemChange} />)
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

    render() {
        return (
            <Content>
                <Form>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Ancillary Type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.ancillaryType}
                            onValueChange={(value) => this.onChange('ancillaryType', value)}>
                            <Picker.Item label="Select Ancillary Type" value="" />
                            <Picker.Item label="CSO" value="CSO" />
                            <Picker.Item label="PSO" value="PSO" />
                        </Picker>
                    </Item>
                    <Item>
                        <FlatList
                            data={this.state.inspectionItemTypes}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </Item>
                    <Item>
                        <Textarea rowSpan={3} colSpan={300} bordered placeholder="Enter comments here.        " onChangeText={(text) => this.onChange('comments', text)} />
                    </Item>
                    <Item>
                        <Textarea rowSpan={3} colSpan={300} bordered placeholder="Enter additional works here." onChangeText={(text) => this.onChange('additionalWorks', text)} />
                    </Item>
                </Form>
            </Content>
        )
    }
}

export default InspectionResult;
