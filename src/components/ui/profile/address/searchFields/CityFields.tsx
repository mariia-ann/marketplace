import search from "@/assets/images/profile/search/search.png";
import Colors from "@/constants/Colors";
import cityList from "@/src/components/ui/profile/address/searchFields/city";
import { XCircle } from 'phosphor-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";


export default function SellerMessages() {
    const router = useRouter();
    const { source, id, title, address, city, codePostal, third } = useLocalSearchParams<{
        source?: 'add' | 'change';
        id?: string;
        title?: string;
        address?: string;
        city?: string;
        codePostal?: string;
        third?: string;
    }>();

    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);


    const inputRef = useRef<TextInput>(null);

    const filteredCity = query.length >= 3
        ? cityList.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        )
        : cityList;

    const clearQuery = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    const selectCity = (city: string) => {
        if (selectedId === city) {
            setSelectedId(null);
        } else {
            setSelectedId(city);
        }
    };

    // Initialize selected city from params to keep it highlighted when revisiting
    useEffect(() => {
        if (city) {
            setSelectedId(city as string);
        }
    }, [city]);

    const handleConfirm = () => {
        if (!selectedId) return;

        if (source === 'add') {
            router.replace({
                pathname: "/(tabs)/profile/addresses/addNewAddress",
                params: { 
                    city: selectedId, 
                    title: title || '', 
                    third: third || '',
                    codePostal: codePostal || ''
                }
            });
            return;
        }

        // default/change flow: navigate back to ChangeAddress with updated city
        router.replace({
            pathname: "/(tabs)/profile/addresses/changeAddress",
            params: {
                id: id || '',
                title: title || '',
                address: address || '',
                city: selectedId,
                codePostal: codePostal || '',
            }
        });
    };

    return (
        <View style={styles.container}>


            <View style={styles.searchContainer}>
                <Image source={search} style={styles.icon} resizeMode="contain" />
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Пошук..."
                    placeholderTextColor="#999999"
                    onChangeText={setQuery}
                    value={query}
                    underlineColorAndroid="transparent"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={clearQuery} style={{ marginRight: 11 }}>
                        <XCircle size={32} color="#ac94e8" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView style={{ marginTop: 24 }}>
                {query.length >= 3 && filteredCity.length === 0 ? (
                    <Text style={styles.notFoundText}>Нічого не знайдено</Text>
                ) : (
                    filteredCity.map((city) => (
                        <Pressable
                            key={city}
                            style={[
                                styles.cityContainer,
                                selectedId === city && { backgroundColor: '#F5F4FE', borderRadius: 12 }
                            ]}
                            onPress={() => selectCity(city)}
                        >

                            <View style={styles.cityTextContainer}>
                                <Text style={styles.cityItems}>{city}</Text>
                            </View>
                        </Pressable>
                    ))
                )}

                {selectedId && (
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.saveButtonText}>Підтвердити</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: Colors.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey400,
        paddingLeft: 10,
        height: 48,
        marginHorizontal: 20,
    },
    icon: {
        marginRight: 10,
        height: 24,
        width: 24,
    },
    input: {
        flex: 1,
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
        height: 48,
        outlineWidth: 0,
    },
    cityContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    cityTextContainer: {
        flex: 1,
        marginLeft: 20,
    },
    cityItems: {
        fontFamily: 'ManropeBold',
        fontSize: 14,
        color: Colors.blackMain,
    },

    notFoundText: {
        textAlign: 'center',
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.grey500,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#8E6CEF",
        height: 52,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 40,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "ManropeBold",
    },
});