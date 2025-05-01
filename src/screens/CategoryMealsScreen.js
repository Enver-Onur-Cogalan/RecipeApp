import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { filterByCategory } from '../api/meals';
import { SafeAreaView } from 'react-native-safe-area-context';
import MealCard from '../components/MealCard';
import BackButton from '../components/BackButton';

const CategoryMealsScreen = ({ route }) => {
    const { category } = route.params;
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMeals = async () => {
            try {
                const data = await filterByCategory(category);
                setMeals(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadMeals();
    }, [category]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color='#00c897' />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <Text style={styles.heading}>{category} Meals</Text>
            <FlatList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                    <MealCard meal={item} />
                )}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default CategoryMealsScreen;