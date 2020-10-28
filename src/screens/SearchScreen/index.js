import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { clockIcon, searchIcon, hourGlassIcon } from '../../../Assets/Icons';
import RecentSearchesCard from '../../components/RecentSearchesCard';
import SearchScreenButton from '../../components/SearchScreenButton';
import styles from './styles';

const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const SearchScreen = ({ navigation }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [selected, setSelected] = useState({
    songs: false,
    videos: false,
    playlists: false,
    albums: false,
    artists: false,
    genre: false,
  });

  const selectButton = (name, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .collection('recentSearches')
      .get()
      .then((documents) => {
        let data = [];
        documents.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        setSearchHistory(data);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchWithClose}>
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() =>
              navigation.navigate('SearchResultsScreen', { selected: selected })
            }>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              style={styles.textInput}
              textStyle={{ color: 'white' }}
              editable={false}
              placeholderTextColor="#918E96"
            />
          </TouchableOpacity>
          <Text style={styles.closeButton} onPress={() => navigation.goBack()}>
            Close
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              onPress={() => selectButton('songs', !selected.songs)}
              style={styles.item}>
              <SearchScreenButton title="Songs" selected={selected.songs} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selectButton('videos', !selected.videos)}
              style={styles.item}>
              <SearchScreenButton title="Videos" selected={selected.videos} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => selectButton('playlists', !selected.playlists)}
              style={styles.item}>
              <SearchScreenButton
                title="Playlists"
                selected={selected.playlists}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              onPress={() => selectButton('albums', !selected.albums)}
              style={styles.item}>
              <SearchScreenButton title="Albums" selected={selected.albums} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectButton('artists', !selected.artists)}
              style={styles.item}>
              <SearchScreenButton title="Artists" selected={selected.artists} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => selectButton('genre', !selected.genre)}
              style={styles.item}>
              <SearchScreenButton title="Genre" selected={selected.genre} />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.header}>
          <Image source={clockIcon} style={styles.headerIcon} />
          <Text style={styles.headerText}>Recent Searches</Text>
        </View>
        {searchHistory.length > 0 ? (
          <FlatList
            data={searchHistory}
            keyExtractor={() => randomize('Aa0!', 10)}
            renderItem={({ item }) => {
              return (
                <RecentSearchesCard
                  title={item.text}
                  createdAt={item.createdAt.toDate()}
                />
              );
            }}
          />
        ) : (
          <View style={styles.recentSearchesContainer}>
            <Image source={hourGlassIcon} style={styles.recentIcon} />
            <Text style={styles.recentSearchesText}>
              No recent searches yet!
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

// const SearchScreen = () => {
//   return (
//     <ReactiveBase
//       app="good-books-ds"
//       credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d">
//       <ScrollView>
//         <View style={styles.container}>
//           <DataSearch
//             componentId="searchbox"
//             dataField={[
//               'original_title',
//               'original_title.search',
//               'authors',
//               'authors.search',
//             ]}
//             placeholder="Search for books"
//           />
//           <ReactiveList
//             componentId="results"
//             dataField="original_title"
//             size={7}
//             showResultStats={false}
//             pagination={true}
//             react={{
//               and: 'searchbox',
//             }}
//             onData={(res) => (
//               <View style={styles.result}>
//                 <Image source={{ uri: res.image }} style={styles.image} />
//                 <View style={styles.item}>
//                   <Text style={styles.title}>{res.original_title}</Text>
//                   <Text>{res.authors}</Text>
//                 </View>
//               </View>
//             )}
//           />
//         </View>
//       </ScrollView>
//     </ReactiveBase>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     marginTop: 25,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   result: {
//     flexDirection: 'row',
//     width: '100%',
//     margin: 5,
//     alignItems: 'center',
//   },
//   item: {
//     flexDirection: 'column',
//     paddingLeft: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//   },
// });

export default SearchScreen;
