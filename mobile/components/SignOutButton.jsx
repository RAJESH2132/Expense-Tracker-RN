import { useClerk } from "@clerk/clerk-expo";
import { Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { useState } from "react";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            await signOut();
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.text} />
      ) : (
        <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
      )}
    </TouchableOpacity>
  );
};
