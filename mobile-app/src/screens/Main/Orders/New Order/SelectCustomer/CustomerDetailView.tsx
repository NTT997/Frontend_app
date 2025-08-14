import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Customer } from '@ui/shared-models';
import styles from './SelectCustomer.style';

const { width } = Dimensions.get('window');

interface Props {
    customers: Customer[];
    selectedIndex: number;
    onSelectCustomer: (customer: Customer) => void;
    onBack: () => void;
}

const CustomerDetailView: React.FC<Props> = ({
    customers,
    selectedIndex,
    onSelectCustomer,
    onBack
}) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: selectedIndex * width, y: 0 }}
            >
                {customers.map((customer) => (
                    <View key={customer.id} style={[styles.detailCard, { width }]}>
                        <Text style={styles.detailName}>
                            {customer.firstName} {customer.lastName}
                        </Text>
                        <Text style={styles.detailInfo}>
                            Gender: {customer.gender || 'N/A'}
                        </Text>
                        <Text style={styles.detailInfo}>
                            Email: {customer.emailAddress}
                        </Text>
                        <Text style={styles.detailInfo}>
                            Address: {customer.billing?.address || 'No address available'}
                        </Text>
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() => onSelectCustomer(customer)}
                        >
                            <Text style={styles.selectButtonText}>Select This Customer</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>← Back to List</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomerDetailView;
