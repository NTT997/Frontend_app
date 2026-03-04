import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ChildLayout from "@/components/layout/ChildLayout";
import { orderService } from "@/api/order.service";
import { OrderList } from "@ui/shared-models";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const statusColors: Record<string, string> = {
  PROCESSING: "green",
  APPROVED: "green",
  REJECTED: "red",
};

const HistoryScreen = () => {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState(true);
  const emailAdmin = useSelector((state: RootState) => state.userprofile.profile?.email);

  useEffect(() => {
    const fetchOrders = async () => {
      const service = new orderService();

      const res = await service.getOrderList({ page: 0, emailAdmin: emailAdmin });
      setOrders(res?.orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => {
    const date = dayjs(item.datePurchased);
    const day = date.format("DD");
    const month = date.format("MMM").toUpperCase();
    const year = date.format("YYYY");

    const statusText = item.orderStatus?.toUpperCase() || "UNKNOWN";
    const statusColor =
      statusText === "PROCESSED" || statusText === "PROCESSING"
        ? "green"
        : statusText === "REJECTED"
          ? "red"
          : "gray";

    return (
      <View style={styles.card}>
        {/* Date */}
        <View style={styles.dateBox}>
          <Text style={styles.year}>{year}</Text>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.month}>{month}</Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.orderId}>Order: #{item.id}</Text>
          <Text style={styles.name}>
            {item.billing?.firstName} {item.billing?.lastName}
          </Text>
          <Text style={styles.email}>{item.billing?.email}</Text>
        </View>

        {/* Total & Status vertically */}
        <View style={styles.rightSectionVertical}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${Number(Math.round(item.total?.value || 0)).toLocaleString()}
          </Text>

          <Text style={styles.totalLabel}>Status</Text>
          <Text style={[styles.status, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ChildLayout title="History">
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : orders?.length ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 10 }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#666" }}>No Data Found!</Text>
        </View>
      )}
    </ChildLayout>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  dateBox: {
    alignItems: "center",
    marginRight: 10,
    width: 50,
  },
  year: {
    fontSize: 12,
    color: "#999",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0A3D91",
  },
  month: {
    fontSize: 12,
    color: "#999",
  },
  info: {
    flex: 1,
  },
  orderId: {
    fontSize: 12,
    color: "#666",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    fontSize: 12,
    color: "#999",
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  }, rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 100,
  },
  rightLabels: {
    marginRight: 8,
    alignItems: "flex-start",
  },
  rightValues: {
    alignItems: "flex-end",
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  rightSectionVertical: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 100,
    marginLeft: 10,
  },
});
