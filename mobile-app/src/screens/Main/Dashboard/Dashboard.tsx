import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MainLayout from '@/components/layout/MainLayout';  // Adjust the import path if needed
import { useDashboardViewModel } from './DashboardViewModel'; // Adjust path accordingly

const DashboardScreen = () => {
  const { profile, modalVisible, closeModal } = useDashboardViewModel();

  return (
    <MainLayout>
      {/* Dashboard content */}
      <View style={styles.content}>
        <Text>Dashboard</Text>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Hello, {profile?.emailAddress}!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    minWidth: 250,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#0A3D91',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
