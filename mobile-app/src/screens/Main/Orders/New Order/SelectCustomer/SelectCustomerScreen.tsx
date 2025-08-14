import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ScrollView
} from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomerService } from '@/api/customer.service';
import { Customer } from '@ui/shared-models';
import styles from './SelectCustomer.style';
import CustomerListView from './CustomerListView';
import CustomerDetailView from './CustomerDetailView';

const { width } = Dimensions.get('window');

const SelectCustomerScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    const [mode, setMode] = useState<'list' | 'detail'>('list'); // track view mode
    const [selectedIndex, setSelectedIndex] = useState(0);

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
                name: `${customer.firstName} ${customer.lastName}`,
                email: customer.emailAddress,
                gender: customer.gender
            });
        }
        navigation.goBack();
    };

    const openDetailView = (index: number) => {
        setSelectedIndex(index);
        setMode('detail');
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
            {mode === 'list' ? (
                <CustomerListView
                    customers={customers}
                    onCardPress={(index) => {
                        setSelectedIndex(index);
                        setMode('detail');
                    }}
                    onNewCustomer={() => console.log('TODO: Create new customer')}
                />
            ) : (
                <CustomerDetailView
                    customers={customers}
                    selectedIndex={selectedIndex}
                    onSelectCustomer={handleSelect}
                    onBack={() => setMode('list')}
                />
            )}
        </ChildLayout>
    );
};

export default SelectCustomerScreen;
