import React, { Component } from 'react';

import {
    FlatList,
    Alert
} from 'react-native'

import { Form, Item, Input,Content,Textarea,Picker,Icon } from 'native-base';
import InspectionItem from './InspectionItem'
import { store, addInspectionItem } from '../redux_inspection';

class InspectionResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inspectionItemTypes: props.inspectionItemTypes,
            ancillaryType:'',
            inspectionItems:[],
            comments:'',
            additionalWorks:''
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            inspectionItemTypes:newProps.inspectionItemTypes
        })
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
            store.dispatch(addInspectionItem(item));

            this.props.onInspectionResultChange({
                ancillaryType:this.state.ancillaryType,
                inspectionItems:this.state.inspectionItems,
                comments:this.state.comments,
                additionalWorks:this.state.additionalWorks
            })
        })
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item, index }) => {
        return (<InspectionItem item={item} index={index} onInspectionItemChange={this.onInspectionItemChange} />)
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
