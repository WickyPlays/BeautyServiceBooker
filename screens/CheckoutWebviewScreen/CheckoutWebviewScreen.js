import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export const CheckoutWebViewScreen = ({ route }) => {
    const { url } = route.params;

    return (
        <View style={styles.container}>
            {/* <WebView
                source={{ uri: url }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                )}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
    },
});
