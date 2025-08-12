import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomerService } from '@/api/customer.service';
import { Customer } from '@ui/shared-models';

const SelectCustomerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const service = new CustomerService();
                const result = await service.CustomerList();
                if (result && result.customers) {
                    setCustomers(result.customers);
                } else {
                    setCustomers([]);
                }
            } catch (error) {
                console.error('Failed to load customers', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleSelect = (customer: Customer) => {
        if (route.params?.onSelect) {
            route.params.onSelect({
                id: customer.id,
                name: customer.emailAddress,
            });
        }
        navigation.goBack();
    };

    if (loading) {
        return (
            <ChildLayout title="Select Customer">
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0A3D91" />
                </View>
            </ChildLayout>
        );
    }

    return (
        <ChildLayout title="Select Customer">
            {customers.length > 0 ? (
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                            <Text style={styles.text}>{item.emailAddress}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No customers found</Text>
                </View>
            )}
        </ChildLayout>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default SelectCustomerScreen;
