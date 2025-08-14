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

const statusColors: Record<string, string> = {
  PROCESSING: "green",
  APPROVED: "green",
  "ON HOLD": "red",
};

const HistoryScreen = () => {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const service = new orderService();
      const res = await service.getOrderList({ page: 0 });
      setOrders(res.orders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => {
    const date = dayjs(item.datePurchased);
    const day = date.format("DD");
    const month = date.format("MMM").toUpperCase();
    const year = date.format("YYYY");

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

        {/* Total */}
        <View style={styles.right}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${Number(item.total?.value || 0).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              {
                color: statusColors[item.orderStatus?.toUpperCase()] || "gray",
              },
            ]}
          >
            {item.orderStatus}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ChildLayout title="History">
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 10 }}
        />
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
    color: "#2e7d32",
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
    marginTop: 4,
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
