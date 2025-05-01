import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchCategories } from '../api/meals';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryCard from '../components/CategoryCard';


const HomeScreen = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError('An error occurred.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color='#00c897' />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.idCategory}
                renderItem={({ item }) => <CategoryCard category={item} />}
            />
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
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    card: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default HomeScreen;