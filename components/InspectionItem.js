import React, { Component } from 'react';

import {Alert} from 'react-native'
import { Form, Item, Icon, Picker, Input, Card, CardItem, Text, Content } from 'native-base';
import { RadioButton } from 'react-native-paper';

class InspectionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:props.item.id,
            name: props.item.name,
            inspectionResult:'',
            fixedOnSite:'no',
            postInspectionWorkReq:'no',
            workOrderNumber:''
        }
    }

    onChange = (fieldName, fieldValue) => {
        this.setState({
            [fieldName]: fieldValue
        },()=>{
            this.props.onInspectionItemChange(this.props.item.id,{
                id:this.state.id,
                name:this.state.name,
                inspectionResult:this.state.inspectionResult,
                fixedOnSite:this.state.fixedOnSite,
                postInspectionWorkReq:this.state.postInspectionWorkReq,
                workOrderNumber:this.state.workOrderNumber
            })
        })
    }

    render() {
        return (
            <Card>
                <CardItem cardBody>
                    <Content>
                        <Form>
                            <Item>
                                <Text>{this.state.name}</Text>
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Inspection Result"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.inspectionResult}
                                    onValueChange={(value) => this.onChange('inspectionResult', value)}>
                                    <Picker.Item label="Select Inspection Result" value="" />
                                    <Picker.Item label="CSO" value="CSO" />
                                    <Picker.Item label="PSO" value="PSO" />
                                </Picker>
                            </Item>
                            <Item>
                                <Text>Fixed Onsite</Text>
                                <RadioButton
                                    value="yes"
                                    uncheckedColor="red"
                                    status={this.state.fixedOnsite === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => { 
                                        if(this.state.inspectionResult=="") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('fixedOnsite','yes' ); 
                                    }}
                                />
                                <RadioButton
                                    value="no"
                                    uncheckedColor="red"
                                    status={this.state.fixedOnsite === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => { 
                                        if(this.state.inspectionResult=="") {
                                            Alert.alert('Please select value for Inspection result');
                                            return;
                                        }
                                        this.onChange('fixedOnsite','no' );
                                    }}
                                /></Item>
                            <Item>
                                <Text>Post Insp Wrk Req</Text>
                                <RadioButton
                                    value="no"
                                    uncheckedColor="red"
                                    status={this.state.postInspectionWorkReq === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => { 
                                        if(this.state.inspectionResult=="") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('postInspectionWorkReq','yes' );
                                    }}
                                />
                                <RadioButton
                                    value="no"
                                    uncheckedColor="red"
                                    status={this.state.postInspectionWorkReq === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => { 
                                        if(this.state.inspectionResult=="") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('postInspectionWorkReq','no' );
                                    }}
                                />
                            </Item>
                            <Item>
                                <Input placeholder="Work Order#" onChangeText={(text) => this.onChange('workOrderNumber', text)} value={this.state.workOrderNumber} />
                            </Item>
                        </Form>
                    </Content>
                </CardItem>
            </Card>
        )
    }
}

export default InspectionItem