import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { logoutAsync, resetAuth } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ReadableUser } from '@ui/shared-models';
import { UserService } from '@/api/user.service';

interface SideMenuModalProps {
  visible: boolean;
  onClose: () => void;
}


const SideMenuModal: React.FC<SideMenuModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState(false);

  const [userProfile, setUserProfile] = useState<ReadableUser | null>(null);

  useEffect(() => {
    if (visible) {
      const fetchProfile = async () => {
        const service = new UserService();
        const profile = await service.getProfileDetail();
        if (profile) setUserProfile(profile);
      };
      fetchProfile();
    }
  }, [visible]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap(); // call the async thunk
      dispatch(resetAuth()); // reset Redux auth state
      setShowConfirm(false);
      onClose();
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
          <View style={styles.menuContainer}>
            <ScrollView>
              <View style={styles.userInfo}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>R</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.userName}>{userProfile?.userName ?? 'Loading...'}</Text>
                  <Text style={styles.userRole}>{userProfile?.groups[0].name ?? 'Loading...'}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Account Info */ }}>
                <Feather name="user" size={20} color="#333" />
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Language */ }}>
                <Feather name="globe" size={20} color="#333" />
                <Text style={styles.menuText}>Language</Text>
              </TouchableOpacity>

              { /*
              <TouchableOpacity style={styles.menuItem} onPress={() => {  }}>
                <Feather name="cloud" size={20} color="#333" />
                <Text style={styles.menuText}>Xuất dữ liệu</Text>
              </TouchableOpacity>
                */ }

              <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: About eSales */ }}>
                <Feather name="info" size={20} color="#333" />
                <Text style={styles.menuText}>App Information</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => setShowConfirm(true)}>
                <Feather name="log-out" size={20} color="red" />
                <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>App Version 20251208_01</Text>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        transparent
        visible={showConfirm}
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmContainer}>
            <Text style={styles.confirmTitle}>Confirm Logout?</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: '#ccc' }]}
                onPress={() => setShowConfirm(false)}
              >
                <Text>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: 'red' }]}
                onPress={handleLogout}
              >
                <Text style={{ color: 'white' }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  menuContainer: {
    width: '75%',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  userName: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 30,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  confirmOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  confirmContainer: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  confirmTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  confirmButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  confirmButton: { flex: 1, padding: 12, borderRadius: 6, marginHorizontal: 5, alignItems: 'center' },

});

export default SideMenuModal;
