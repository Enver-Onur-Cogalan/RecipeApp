import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import DetailScreen from '../screens/DetailScreen';
import CategoryMealsScreen from "../screens/CategoryMealsScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;