import React, { useState } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (imageAsset) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: imageAsset.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://johonifragrance.com/codeigniter/public/upload', {
        method: 'GET',
		
        //body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => console.log('Server says:', data))
        .catch((err) => console.error('Fetch error:', err));

      //console.log('Upload response status:', response.status);
      const data = await response;
      console.log('dfdfadfadfa');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {/*<Text>Photo taken at: {time}</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, marginTop: 20 },
});

const now = new Date();
const time = now.toLocaleTimeString();
