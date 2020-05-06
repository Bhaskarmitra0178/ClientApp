import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Spinner } from 'native-base';

export const Splash =() => {
    return (
        <Container style={styles.loading}>
            <Spinner/>
        </Container>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})