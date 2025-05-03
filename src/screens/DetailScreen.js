import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getMealDetails } from '../api/meals';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react-lite';
import favoriteStore from '../stores/FavoriteStore';


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
            <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 40 }]}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{meal.strMeal}</Text>
                    <TouchableOpacity onPress={() => favoriteStore.toggleFavorite(meal)}>
                        <Icon
                            name={favoriteStore.isFavorite(meal.idMeal) ? 'heart' : 'heart-outline'}
                            size={30}
                            color='#f00'
                            style={{ marginLeft: 6, marginBottom: 10 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.section}>Ingredients:</Text>
                    {Array.from({ length: 20 }, (_, i) => {
                        const ingredient = meal[`strIngredient${i + 1}`];
                        const measure = meal[`strMeasure${i + 1}`];
                        return (
                            ingredient && (
                                <View key={i} style={styles.ingredientRow}>
                                    <Icon
                                        name='leaf-outline'
                                        size={18}
                                        color='#00c897'
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text style={styles.ingredient}>
                                        {ingredient} - {measure}
                                    </Text>
                                </View>
                            )
                        );
                    })}
                </View>

                <View style={styles.card}>
                    <Icon name='book-outline' size={20} color='#00c897' style={{ marginRight: 8 }} />
                    <Text style={styles.section}>Instructions:</Text>
                    <Text style={styles.instructions}>{meal.strInstructions}</Text>
                </View>
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
        color: '#333',
    },
    section: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
    },
    instructions: {
        fontSize: 14,
        lineHeight: 24,
        color: '#555',
        marginBottom: 4,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fdfdfd',
        borderWidth: 1,
        borderColor: '#00c897',
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    ingredient: {
        fontSize: 16,
        lineHeight: 20,
        color: '#333',
        marginBottom: 4,
        fontWeight: '500',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
});

export default observer(DetailScreen);