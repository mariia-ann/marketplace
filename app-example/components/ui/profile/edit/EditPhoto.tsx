import { Camera, Image as ImageIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function EditPhoto() {
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const handleTakePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                setPhotoUri(response.assets[0].uri || null);
            }
        });
    };

    const handleChooseFromLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                setPhotoUri(response.assets[0].uri || null);
            }
        });
    };

    return (
        <View>
            <View style={styles.photoSection}>
                {photoUri ? (
                    <Image
                        source={{ uri: photoUri }}
                        style={styles.profileCircle}
                    />
                ) : (
                    <View style={styles.profileCircle}>
                        <Text style={styles.profileInitials}>КК</Text>
                    </View>
                )}
                <Text style={styles.photoLabel}>Фото профілю</Text>
            </View>

            <View style={styles.photoButtons}>
                <TouchableOpacity
                    style={styles.photoButton}
                    onPress={handleTakePhoto}
                >
                    <Camera size={32} color="#8e6cef" weight="thin" />
                    <Text style={styles.photoButtonText}>Зробити фото</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.photoButton}
                    onPress={handleChooseFromLibrary}
                >
                    <ImageIcon size={32} color="#8e6cef" weight="thin" />
                    <Text style={styles.photoButtonText}>Галерея</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    photoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginLeft: 20,
    },
    profileCircle: {
        backgroundColor: '#8E6CEF',
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    profileInitials: {
        fontSize: 22,
        color: '#170F2B',
        fontFamily: "ManropeBold",
    },
    photoLabel: {
        marginLeft: 20,
        fontSize: 20,
        color: '#170F2B',
        alignSelf: 'center',
        fontFamily: "Manrope",
    },
    photoButtons: {
        flexDirection: 'row',
        marginTop: 16,
        marginLeft: 20,
        justifyContent: "space-around",
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    photoButtonText: {
        color: '#8E6CEF',
        fontSize: 16,
        marginLeft: 6,
        fontWeight: 700,
    },
});
