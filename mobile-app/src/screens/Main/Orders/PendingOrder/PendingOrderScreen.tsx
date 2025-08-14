import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { OrderRequestService } from "@/api/orderRequest.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { OrderRequestApproval, ApproverRequestItem } from '@ui/shared-models';
import ChildLayout from "@/components/layout/ChildLayout";
import { Modal } from "react-native";
import styles from './PendingOrder.style';
import { showToast } from "@/components/toast/toast";

type ApprovalStatus = "PENDING" | "ACCEPTED" | "REJECTED";

const STATUSES: ApprovalStatus[] = ["PENDING", "ACCEPTED", "REJECTED"];


export default function ApproverRequestsScreen() {
  const [status, setStatus] = useState<ApprovalStatus>("PENDING");
  const [data, setData] = useState<ApproverRequestItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ApproverRequestItem | null>(null);

  const [approverList, setApproverList] = useState([]);

  const orderRequestService = new OrderRequestService();
  const email = useSelector((state: RootState) => state.userprofile.profile?.email);

  const getListOrderRequests = useCallback(
    async (s: ApprovalStatus) => {
      try {
        setLoading(true);
        setError(null);
        const res = await orderRequestService.fetchListOrderRequestByEmail({ email, status: s });

        setData(res ?? []);
      } catch (e: any) {
        setError(e?.message || "NO DATA FOUND");
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  useEffect(() => {
    getListOrderRequests(status);
  }, [status, getListOrderRequests]);

  const renderStatusFilter = () => (
    <View style={styles.filterRow}>
      {STATUSES.map((s) => {
        const active = s === status;
        return (
          <TouchableOpacity
            key={s}
            onPress={() => {
              ; setStatus(s)
            }}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {s}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderApproval = (a: OrderRequestApproval) => {
    // Map status to colors
    const statusColors: Record<ApprovalStatus, string> = {
      PENDING: "#f9a825",   // yellow
      ACCEPTED: "#0A3D91",  // blue
      REJECTED: "#c62828",  // red
    };

    return (
      <View key={a.id} style={styles.approvalCard}>
        <View style={styles.approvalHeader}>
          <Text style={styles.approverName}>{a.approvedBy ?? "N/A"}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[a.status as ApprovalStatus] }]}>
            <Text style={styles.statusText}>{a.status}</Text>
          </View>
        </View>

        <Text style={styles.orderInfo}>
          Order: {a.orders ?? 0}
        </Text>

        {a.approvedTime && (
          <Text style={styles.approvalTime}>
            Approved on: {new Date(a.approvedTime).toLocaleString()}
          </Text>
        )}

        {a.approvedNotes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Note:</Text>
            <Text style={styles.notesText}>{a.approvedNotes}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderItem = ({ item }: { item: ApproverRequestItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedRecord(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.code}>{item.code}</Text>
        {item.status ? (
          <Text
            style={[
              styles.badge,
              styles[item.status.toLowerCase() as "accepted" | "pending" | "rejected"],
            ]}
          >
            {item.status}
          </Text>
        ) : (
          <Text style={[styles.badge, styles.statusText]}>{status}</Text>
        )}
      </View>
      <Text style={styles.meta}>
        Order ID: {item.orderId} • Created:{" "}
        {new Date(item.createdAt).toLocaleString()}
      </Text>

    </TouchableOpacity>
  );

  // Handlers for Approve / Reject
  const handleApprove = async () => {
    if (!selectedRecord || !email) return;

    try {
      const res = await orderRequestService.updateOrderRequestStatusApprovers(
        selectedRecord.id, email
      );

      if (res) {
        showToast("Request approved successfully!");
        setSelectedRecord(null);
        setStatus(STATUSES[1]);
      } else {
        showToast("Approval failed!");
        console.warn("Approval failed: no response payload");
      }
    } catch (err: any) {
      console.error("Approval error:", err?.message || err);
      showToast("Error approving request!");
    }
  };

  const handleReject = async () => {
    if (!selectedRecord || !email) return;

    try {
      const res = await orderRequestService.rejectOrderRequest(
        selectedRecord.id,
        email,
        { note: "Reject message" }
      );

      if (res) {
        showToast("Request Rejected!");
        setSelectedRecord(null);
        getListOrderRequests(status);
      } else {
        showToast("Reject Request failed!");
        console.warn("Reject failed: no response payload");
      }
    } catch (err: any) {
      console.error("Reject error:", err?.message || err);
      showToast("Error approving request!");
    }
  };

  return (
    <ChildLayout title="Approver Requests">

      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.screenTitle}>Approver Requests</Text> */}
        {renderStatusFilter()}

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text style={styles.loadingText}>Loading…</Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              onPress={() => getListOrderRequests(status)}
              style={styles.retryBtn}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={
              data.length === 0 ? styles.centerList : undefined
            }
            ListEmptyComponent={
              <Text style={styles.empty}>No Data Found!</Text>
            }
          />
        )}

        {/* Modal */}
        <Modal
          visible={!!selectedRecord}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedRecord(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Approvals for {selectedRecord?.code}
              </Text>
              <View style={styles.section}>
                {selectedRecord?.listOrderRequestApproval?.length ? (
                  selectedRecord.listOrderRequestApproval.map(renderApproval)
                ) : (
                  <Text style={styles.emptyLine}>No approvals</Text>
                )}
              </View>

              {selectedRecord?.listOrderRequestApproval.find((a) => a.approvedBy == email && a.status == "PENDING") && (
                <View style={styles.modalButtons}>

                  <TouchableOpacity
                    style={[styles.modalBtn, { backgroundColor: "green" }]}
                    onPress={handleApprove}
                  >
                    <Text style={styles.modalBtnText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalBtn, { backgroundColor: "red" }]}
                    onPress={handleReject}
                  >
                    <Text style={styles.modalBtnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={() => setSelectedRecord(null)}
                style={styles.modalClose}
              >
                <Text style={{ color: "#111", fontWeight: "600" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>

    </ChildLayout>
  );
}
