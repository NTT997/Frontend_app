import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Header from '@/components/layout/Header/Header';
import { useDashboardViewModel } from '../Dashboard/DashboardViewModel'; // Adjust path accordingly

const ReportScreen = () => {
  const { profile, modalVisible, closeModal } = useDashboardViewModel();

  return (
    <View style={styles.container}>
      <Header />
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
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
