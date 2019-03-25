import React, { Component } from 'react';

import { Alert } from 'react-native'
import { Form, Item, Icon, Picker, Input, Card, CardItem, Text, Content } from 'native-base';
import { RadioButton } from 'react-native-paper';
import { store } from '../redux_inspection';


class InspectionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.item.id,
            name: props.item.name,
            inspectionResult: '',
            fixedOnSite: '',
            postInspectionWorkReq: '',
            workOrderNumber: '',
            index: props.index,
            allInspectionItems: [],
            prevItemFilled: false
        }

        store.subscribe(() => {
            var state = store.getState();
            console.log(state)
            this.setState({
                allInspectionItems: state.inspectionItems
            })
        })
    }


    onChange = (fieldName, fieldValue) => {
        if (this.props.index > 0) {
            var prevItem = this.state.allInspectionItems.find((item) => {
                return item.index == (this.props.index - 1);
            })
            //console.log(prevItem)
            if (prevItem && (prevItem.inspectionResult != "" && prevItem.fixedOnSite != "" && prevItem.postInspectionWorkReq != "" && prevItem.workOrderNumber != "")) {
                this.setState({
                    [fieldName]: fieldValue
                }, () => {
                    this.props.onInspectionItemChange(this.props.item.id, {
                        id: this.state.id,
                        name: this.state.name,
                        inspectionResult: this.state.inspectionResult,
                        fixedOnSite: this.state.fixedOnSite,
                        postInspectionWorkReq: this.state.postInspectionWorkReq,
                        workOrderNumber: this.state.workOrderNumber,
                        index: this.props.index
                    })
                })
            }
        }
        else {
            this.setState({
                [fieldName]: fieldValue
            }, () => {
                this.props.onInspectionItemChange(this.props.item.id, {
                    id: this.state.id,
                    name: this.state.name,
                    inspectionResult: this.state.inspectionResult,
                    fixedOnSite: this.state.fixedOnSite,
                    postInspectionWorkReq: this.state.postInspectionWorkReq,
                    workOrderNumber: this.state.workOrderNumber,
                    index: this.state.index
                })
            })
        }

    }

    shouldComponentUpdate() {
        if (this.props.index > 0) {
            var prevItem = this.state.allInspectionItems.find((item) => {
                return item.index == (this.props.index - 1);
            })
            //console.log(prevItem)
            if (prevItem) {
                if ((prevItem.inspectionResult != "" && prevItem.fixedOnSite != "" && prevItem.postInspectionWorkReq != "" && prevItem.workOrderNumber != "")) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        return true;
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
                                    onValueChange={(value) => {
                                        this.onChange('inspectionResult', value)
                                    }
                                    } >
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
                                    status={this.state.fixedOnSite === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        if (this.state.inspectionResult == "") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('fixedOnSite', 'yes');
                                    }}
                                />
                                <RadioButton
                                    value="no"
                                    uncheckedColor="red"
                                    status={this.state.fixedOnSite === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        if (this.state.inspectionResult == "") {
                                            Alert.alert('Please select value for Inspection result');
                                            return;
                                        }
                                        this.onChange('fixedOnSite', 'no');
                                    }}
                                /></Item>
                            <Item>
                                <Text>Post Insp Wrk Req</Text>
                                <RadioButton
                                    value="yes"
                                    uncheckedColor="red"
                                    status={this.state.postInspectionWorkReq === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        if (this.state.inspectionResult == "") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('postInspectionWorkReq', 'yes');
                                    }}
                                />
                                <RadioButton
                                    value="no"
                                    uncheckedColor="red"
                                    status={this.state.postInspectionWorkReq === 'no' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        if (this.state.inspectionResult == "") {
                                            Alert.alert('Please select value for Inspection result first.');
                                            return;
                                        }
                                        this.onChange('postInspectionWorkReq', 'no');
                                    }}
                                />
                            </Item>
                            <Item>
                                <Input placeholder="Work Order#" onChangeText={(text) => {
                                    if (this.state.inspectionResult == "") {
                                        Alert.alert('Please select value for Inspection result first.');
                                        return;
                                    }
                                    this.onChange('workOrderNumber', text)
                                }} value={this.state.workOrderNumber} />
                            </Item>
                        </Form>
                    </Content>
                </CardItem>
            </Card>
        )
    }
}

export default InspectionItem