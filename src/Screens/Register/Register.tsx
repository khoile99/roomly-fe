import { View, Text, StyleSheet } from "react-native";

export interface IRegisterProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Register = (props: IRegisterProps) => {
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
