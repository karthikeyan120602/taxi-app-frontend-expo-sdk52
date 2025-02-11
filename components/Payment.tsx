import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();
  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  // Function to fetch Payment Sheet parameters
  async function fetchPaymentSheetParams(): Promise<{
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
  }> {
    return fetch(
      `https://uber-backend-chi.vercel.app/api/payment/create-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email: email,
          amount: amount,
        }),
      }
    ).then((res) => res.json());
  }

  // Function to initialize the Stripe Payment Sheet
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Expo, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: fullName || email.split("@")[0],
        email: email,
      },
      returnURL: "myapp://book-ride",
      applePay: {
        merchantCountryCode: "US",
      },
    });

    if (error) {
      throw new Error("Failed to initialize payment sheet");
    }
  };

  // Function to create a ride after payment
  const createRideAndRedirect = async () => {
    try {
      const response = await fetch(
        "https://uber-backend-chi.vercel.app/api/rides/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            origin_address: userAddress,
            destination_address: destinationAddress,
            origin_latitude: userLatitude,
            origin_longitude: userLongitude,
            destination_latitude: destinationLatitude,
            destination_longitude: destinationLongitude,
            ride_time: Number(rideTime.toFixed(0)), // Ensure it's a number
            fare_price: parseInt(amount) * 100, // Convert to cents if needed
            payment_status: "paid",
            driver_id: driverId,
            user_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Update state and navigate
      setSuccess(true);
    } catch (error) {
      console.error("Error creating ride:", error);
      Alert.alert("Error", "Failed to create ride. Please try again.");
    }
  };

  // Function to handle Payment & Ride creation
  const openPaymentSheet = async () => {
    try {
      await initializePaymentSheet();
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        // ✅ Call createRideAndRedirect after successful payment
        await createRideAndRedirect();
      }
    } catch (error) {
      Alert.alert("Payment initialization failed");
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>
          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
