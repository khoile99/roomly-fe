import { Register } from "./Register";
import { RootScreens } from "..";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const RegisterContainer = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Register onNavigate={onNavigate} />;
};
