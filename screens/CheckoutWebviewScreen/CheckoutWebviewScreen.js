import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { aget, apost } from '../../commons/util_axios';
import { clearServiceIds, removeServiceDateId } from '../../commons/checkoutStore';

export const CheckoutWebViewScreen = ({ route }) => {
    const { url, serviceIds, stylistId, appointmentDate } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [requestedUrl, setRequestedUrl] = useState(null);

    const handleNavigationStateChange = (navState) => {
        setLoading(navState.loading);
    };

    const handleShouldStartLoadWithRequest = (request) => {
        const requestedUrl = request.url;
        setRequestedUrl(requestedUrl);

        if (requestedUrl.startsWith('http://localhost:5001/payment/create-appointment-ipn')) {
            const urlParams = new URLSearchParams(requestedUrl.split('?')[1]);
            const responseCode = urlParams.get('vnp_ResponseCode');

            apost('/payment/create-appointment-ipn' + requestedUrl.replace('http://localhost:5001/payment/create-appointment-ipn', ''), {
                serviceIDs: serviceIds,
                stylistID: stylistId,
				appointmentDate: new Date(appointmentDate)
            })
                .then(async (res) => {
                    let data = res.data
                    if (data.RspCode === '00') {
                        navigation.navigate('CheckoutResultSuccess', { message: data.message });
                    } else {
                        navigation.navigate('CheckoutResultFailed', { message: data.message });
                    }
                    await clearServiceIds();
                    await removeServiceDateId();
                }).catch((e) => {
                    console.log(e)
                })
            return false
        }
        return true
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={handleNavigationStateChange}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                startInLoadingState={true}
                renderLoading={() => (
                    loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                )}
            />
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
    urlText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        padding: 10,
        borderRadius: 5,
        color: '#000',
    },
});
