import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import favoriteStore from '../stores/FavoriteStore';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { bounceHeart } from '../utils/animation';

const MealCard = ({ meal }) => {
    const navigaton = useNavigation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigaton.navigate('Detail', { mealId: meal.idMeal })}
        >
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{meal.strMeal}</Text>
            </View>
            <TouchableOpacity onPress={() => favoriteStore.toggleFavorite(meal)}>
                <Animatable.View
                    animation={favoriteStore.isFavorite(meal.idMeal) ? bounceHeart : undefined}
                    duration={600}
                    key={favoriteStore.isFavorite(meal.idMeal) ? 'active' : 'inactive'} // rerender
                >
                    <Icon
                        name={favoriteStore.isFavorite(meal.idMeal) ? 'heart' : 'heart-outline'}
                        size={28}
                        color='#f00'
                    />
                </Animatable.View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default observer(MealCard);