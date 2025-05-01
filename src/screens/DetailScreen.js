import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getMealDetails } from '../api/meals';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';


const DetailScreen = ({ route }) => {
    const { mealId } = route.params;
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadMeal = async () => {
            try {
                const data = await getMealDetails(mealId);
                setMeal(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMeal();
    }, [mealId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color='#00c897' />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <BackButton />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Text style={styles.section}>Ingredients:</Text>
                {Array.from({ length: 20 }, (_, i) => {
                    const ingredient = meal[`strIngredient${i + 1}`];
                    const measure = meal[`strMeasure${i + 1}`];
                    return (
                        ingredient && (
                            <Text key={i} style={styles.ingredient}>
                                • {ingredient} - {measure}
                            </Text>
                        )
                    )
                })}
                <Text style={styles.section}>Instructions:</Text>
                <Text style={styles.instructions}>{meal.strInstructions}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        height: 220,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        alignSelf: 'center',
    },
    section: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
    },
    instructions: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444',
    },
});

export default DetailScreen;