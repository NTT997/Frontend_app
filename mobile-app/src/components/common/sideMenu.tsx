import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SideMenuModalProps {
  visible: boolean;
  onClose: () => void;
}

const SideMenuModal: React.FC<SideMenuModalProps> = ({ visible, onClose }) => {
  return (
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
                <Text style={styles.userName}>Nguyễn Minh Trường</Text>
                <Text style={styles.userRole}>Nhân Viên Bán Hàng</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Account Info */ }}>
              <Feather name="user" size={20} color="#333" />
              <Text style={styles.menuText}>Thông tin tài khoản</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Language */ }}>
              <Feather name="globe" size={20} color="#333" />
              <Text style={styles.menuText}>Ngôn ngữ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Export Data */ }}>
              <Feather name="cloud" size={20} color="#333" />
              <Text style={styles.menuText}>Xuất dữ liệu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: About eSales */ }}>
              <Feather name="info" size={20} color="#333" />
              <Text style={styles.menuText}>Thông tin về eSales</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* TODO: Check-out */ }}>
              <Feather name="log-out" size={20} color="red" />
              <Text style={[styles.menuText, { color: 'red' }]}>Check-out cuối ngày</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Phiên bản eSales SFA 20241205_01</Text>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
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
});

export default SideMenuModal;
