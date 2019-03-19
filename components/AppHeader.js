import React, { Component } from 'react'
import { Header, Body, Button, Right, Title, Text, StyleProvider } from 'native-base';
import getTheme from '../Themes/app/components';
import platform from '../Themes/app/variables/platform'

class AppHeader extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Header>
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.onNext()} transparent>
                            <Text>Next</Text>
                        </Button>
                    </Right>
                </Header>
            </StyleProvider>
        )
    }
}

export default AppHeader;
