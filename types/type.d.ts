import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

// import { TextInputProps, TouchableOpacityProps } from "react-native";

// // Driver type with required properties
// declare interface Driver {
//   id: number;
//   first_name: string;
//   last_name: string;
//   profile_image_url: string;
//   car_image_url: string;
//   car_seats: number;
//   rating: number;
// }

// // MarkerData type for map markers and related information
// declare interface MarkerData {
//   latitude: number;
//   longitude: number;
//   id: number;
//   title: string;
//   profile_image_url: string;
//   car_image_url: string;
//   car_seats: number;
//   rating: number;
//   first_name: string;
//   last_name: string;
//   time?: number; // Optional: time-related property (e.g., ride duration)
//   price?: string; // Optional: price-related property
// }

// // Props for the map component, including optional destination and callback
// declare interface MapProps {
//   destinationLatitude?: number;
//   destinationLongitude?: number;
//   onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
//   selectedDriver?: number | null;
//   onMapReady?: () => void;
// }

// // Ride details including payment status and driver info
// declare interface Ride {
//   origin_address: string;
//   destination_address: string;
//   origin_latitude: number;
//   origin_longitude: number;
//   destination_latitude: number;
//   destination_longitude: number;
//   ride_time: number; // Ride duration in minutes or seconds
//   fare_price: number; // Ride fare (usually in currency)
//   payment_status: string; // Payment status, e.g., "paid", "pending"
//   driver_id: number; // ID of the driver
//   user_id: string; // ID of the user who booked the ride
//   created_at: string; // Timestamp of ride creation
//   driver: {
//     first_name: string;
//     last_name: string;
//     car_seats: number;
//   };
// }

// // Button component with extended properties for various button types
// declare interface ButtonProps extends TouchableOpacityProps {
//   title: string;
//   bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
//   textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
//   IconLeft?: React.ComponentType<any>;
//   IconRight?: React.ComponentType<any>;
//   className?: string;
// }

// // Google Input component props
// declare interface GoogleInputProps {
//   icon?: string;
//   initialLocation?: string;
//   containerStyle?: string;
//   textInputBackgroundColor?: string;
//   handlePress: ({
//     latitude,
//     longitude,
//     address,
//   }: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   }) => void;
// }

// // Text Input field component properties with additional styling
// declare interface InputFieldProps extends TextInputProps {
//   label: string;
//   icon?: any;
//   secureTextEntry?: boolean;
//   labelStyle?: string;
//   containerStyle?: string;
//   inputStyle?: string;
//   iconStyle?: string;
//   className?: string;
// }

// // Payment-related properties
// declare interface PaymentProps {
//   fullName: string;
//   email: string;
//   amount: string;
//   driverId: number;
//   rideTime: number; // Ride duration in minutes or seconds
// }

// // Location store management
// declare interface LocationStore {
//   userLatitude: number ;
//   userLongitude: number;
//   userAddress: string ;
//   destinationLatitude: number ;
//   destinationLongitude: number ;
//   destinationAddress: string ;

//   // Functions for updating user and destination location
//   setUserLocation: ({
//     latitude,
//     longitude,
//     address,
//   }: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   }) => void;

//   setDestinationLocation: ({
//     latitude,
//     longitude,
//     address,
//   }: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   }) => void;
// }

// // Driver store management
// declare interface DriverStore {
//   drivers: MarkerData[];
//   selectedDriver: number | null;

//   // Functions for handling drivers
//   setSelectedDriver: (driverId: number) => void;
//   setDrivers: (drivers: MarkerData[]) => void;
//   clearSelectedDriver: () => void;
// }

// // Driver card properties
// declare interface DriverCardProps {
//   item: MarkerData; // The driver marker data
//   selected: number; // Selected driver ID
//   setSelected: () => void; // Function to update selected driver
// }
