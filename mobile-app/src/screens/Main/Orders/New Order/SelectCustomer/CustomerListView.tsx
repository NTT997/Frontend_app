import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Customer } from '@ui/shared-models';
import styles from './SelectCustomer.style';

interface Props {
    customers: Customer[];
    onCardPress: (index: number) => void;
    onNewCustomer: () => void;
}

const CustomerListView: React.FC<Props> = ({ customers, onCardPress, onNewCustomer }) => {
    return (
        <>
            {customers.length > 0 ? (
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => onCardPress(index)}
                        >
                            <Text style={styles.name}>
                                {item.firstName} {item.lastName}
                            </Text>
                            <Text style={styles.info}>
                                Gender: {item.gender || 'N/A'}
                            </Text>
                            <Text style={styles.info}>
                                {item.emailAddress}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No customers found</Text>
                </View>
            )}
            <TouchableOpacity style={styles.addButton} onPress={onNewCustomer}>
                <Text style={styles.addButtonText}>+ New Customer</Text>
            </TouchableOpacity>
        </>
    );
};

export default CustomerListView;
