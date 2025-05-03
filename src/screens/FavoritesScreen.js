import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import favoriteStore from '../stores/FavoriteStore';
import MealCard from '../components/MealCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {favoriteStore.favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <LottieView
                        source={require('../assets/animations/emptyHeart.json')}
                        autoPlay
                        loop
                        style={{ width: 250, height: 250 }}
                    />
                    <Text style={styles.text}>No favorites added yet.</Text>
                    <Icon
                        name='restaurant-outline'
                        size={28}
                        color='#666'
                        style={{ marginTop: 8 }}
                    />
                </View>
            ) : (
                <FlatList
                    data={favoriteStore.favorites}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => <MealCard meal={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
});

export default observer(FavoritesScreen);
