import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.cardContainer,
        selected === item.id ? styles.selectedCard : styles.defaultCard,
      ]}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        style={styles.profileImage}
      />

      <View style={styles.infoContainer}>
        {/* Name and Rating */}
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{item.title}</Text>

          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.iconSmall} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        {/* Price, Time, and Seats */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Image source={icons.dollar} style={styles.iconMedium} />
            <Text style={styles.detailText}>${item.price}</Text>
          </View>

          <Text style={styles.separator}>|</Text>

          <Text style={styles.detailText}>{formatTime(item.time!)}</Text>

          <Text style={styles.separator}>|</Text>

          <Text style={styles.detailText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={styles.carImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  selectedCard: {
    backgroundColor: "#2563EB", // Adjust color for selected state
  },
  defaultCard: {
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSmall: {
    width: 14,
    height: 14,
  },
  iconMedium: {
    width: 16,
    height: 16,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
    color: "#374151", // Adjust color
  },
  separator: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginHorizontal: 2,
    color: "#6B7280", // Adjust color
  },
  carImage: {
    width: 56,
    height: 56,
  },
});

export default DriverCard;
