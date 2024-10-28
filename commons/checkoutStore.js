import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVICE_ID = 'serviceIds';

export const addServiceId = async (serviceId) => {
    try {
        const serviceIds = await getServiceIds();
        if (serviceIds.includes(serviceId)) {
            return;
        }
        await AsyncStorage.setItem(SERVICE_ID, JSON.stringify([...serviceIds, serviceId]));
    } catch (error) {
        console.error("Error adding serviceId to AsyncStorage:", error);
    }
};
export const getServiceIds = async () => {
    try {
        const serviceIds = await AsyncStorage.getItem(SERVICE_ID);
        return serviceIds ? JSON.parse(serviceIds) : [];
    } catch (error) {
        console.error("Error getting serviceIds from AsyncStorage:", error);
    }
};

export const removeServiceId = async (serviceId) => {
    try {
        const serviceIds = await getServiceIds();
        const filteredServiceIds = serviceIds.filter(id => id !== serviceId);
        await AsyncStorage.setItem(SERVICE_ID, JSON.stringify(filteredServiceIds));
    } catch (error) {
        console.error("Error removing serviceId from AsyncStorage:", error);
    }
};

export const hasServiceId = async (serviceId) => {
    try {
        const serviceIds = await getServiceIds();
        return serviceIds.includes(serviceId);
    } catch (error) {
        console.error("Error checking serviceId in AsyncStorage:", error);
        return false;
    }
};
