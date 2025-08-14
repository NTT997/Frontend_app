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
import { fetchListOrderRequestByEmail } from "@/api/orderRequestApi";

type ApprovalStatus = "PENDING" | "ACCEPTED" | "REJECTED";

type OrderRequestApproval = {
  id: number;
  approvedBy: string | null;
  orders: number;
  status: ApprovalStatus;
  approvedTime: string | null;
  approvedNotes: string | null;
};

type ApproverRequestItem = {
  id: number;
  code: string;
  createdBy: string | null;
  orderId: number;
  createdAt: string;
  listOrderRequestApproval: OrderRequestApproval[];
  configId: number;
  status: ApprovalStatus;
};

type Props = {
  email: string;
};

const STATUSES: ApprovalStatus[] = ["PENDING", "ACCEPTED", "REJECTED"];

export default function ApproverRequestsScreen({ email }: Props) {
  const [status, setStatus] = useState<ApprovalStatus>("PENDING");
  const [data, setData] = useState<ApproverRequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getListOrderRequests = useCallback(
    async (s: ApprovalStatus) => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchListOrderRequestByEmail(email, s);
        setData(res ?? []);
      } catch (e: any) {
        setError(e?.message || "Không tải được dữ liệu");
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
            onPress={() => setStatus(s)}
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

  const renderApproval = (a: OrderRequestApproval) => (
    <View key={a.id} style={styles.approvalRow}>
      <Text style={styles.approvalText}>
        {a.approvedBy ?? "N/A"} • {a.status} • Order {a.orders}
      </Text>
      {a.approvedTime ? (
        <Text style={styles.approvalSub}>
          {new Date(a.approvedTime).toLocaleString()}
        </Text>
      ) : null}
      {a.approvedNotes ? (
        <Text style={styles.approvalSub}>Note: {a.approvedNotes}</Text>
      ) : null}
    </View>
  );

  const renderItem = ({ item }: { item: ApproverRequestItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.code}>{item.code}</Text>
        {item.status ? (
          <Text
            style={[
              styles.badge,
              styles[
                item.status.toLowerCase() as "accepted" | "pending" | "rejected"
              ],
            ]}
          >
            {item.status}
          </Text>
        ) : (
          <Text style={[styles.badge, styles.pending]}>PENDING</Text>
        )}
      </View>
      <Text style={styles.meta}>
        Order ID: {item.orderId} • Created:{" "}
        {new Date(item.createdAt).toLocaleString()}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Approvals</Text>
        {item.listOrderRequestApproval?.length ? (
          item.listOrderRequestApproval.map(renderApproval)
        ) : (
          <Text style={styles.emptyLine}>No approvals</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Approver Requests</Text>
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
            <Text style={styles.empty}>Không có dữ liệu</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  chipActive: { borderColor: "#333" },
  chipText: { fontSize: 13, color: "#444" },
  chipTextActive: { fontWeight: "700", color: "#111" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  centerList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  loadingText: { marginTop: 8, color: "#666" },
  errorText: { color: "#c62828", textAlign: "center", marginBottom: 12 },
  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  retryText: { color: "#fff", fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  code: { fontSize: 16, fontWeight: "700" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    fontSize: 12,
    color: "#fff",
  },
  accepted: { backgroundColor: "#2e7d32" },
  pending: { backgroundColor: "#f9a825" },
  rejected: { backgroundColor: "#c62828" },
  meta: { marginTop: 6, color: "#666" },

  section: { marginTop: 10 },
  sectionTitle: { fontWeight: "700", marginBottom: 6 },
  approvalRow: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
  },
  approvalText: { fontSize: 13, fontWeight: "600" },
  approvalSub: { fontSize: 12, color: "#666", marginTop: 2 },
  emptyLine: { fontSize: 12, color: "#999" },
  empty: { color: "#666" },
});
