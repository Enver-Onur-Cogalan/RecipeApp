import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const CategoryCard = ({ category }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CategoryMeals', { category: category.strCategory })}
        >
            <View style={styles.card}>
                <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{category.strCategory}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {category.strCategoryDescription}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default CategoryCard;