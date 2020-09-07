import React, { Component, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen'
import { useNavigation } from '@react-navigation/native'

var data = [
  {
    title: '123',
  },
  {
    title: '123',
  },
  {
    title: '123',
  },
]

// const Item = ({ item, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={styles.title}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const [selectedId, setSelectedId] = useState(null);

// const renderItem = ({ item }) => {
//   const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
//   return (
//     <Item
//       item={item}
//       onPress={() => setSelectedId(item.id)}
//       style={{ backgroundColor }}
//     />
//   );
// };

class Home extends Component {
  static navigationOptions = {
    title: 'Home Title',
  }

  constructor(props) {
    super(props)
    this.textPress = this.textPress.bind(this)
  }

  render() {
    return (
      <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {/* <Header/> */}
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionTitle}
                onPress={() => {
                  this.textPress(0)
                }}
              >
                基础组件
              </Text>
              <GoToButton
                style={styles.sectionButton}
                screenName="Base"
                title="基础组件"
              />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionTitle}
                onPress={() => {
                  this.textPress(1)
                }}
              >
                {'FlatList&SectionList'}
              </Text>
            </View>
          </View>
          {/* <LearnMoreLinks/> */}
        </ScrollView>
      </>
    )
  }

  textPress(index: Number) {
    const navigation = this.props.navigation
    // navigation.navigate('Base')
    if (index === 0) {
      navigation.navigate('Base', {
        itemId: 86,
        otherParam: 'anything you want here',
      })
    } else {
      navigation.navigate('List', {
        itemId: 86,
        otherParam: 'anything you want here',
      })
    }
  }
}

function GoToButton({ screenName, title }) {
  const navigation = useNavigation()

  return (
    <Button title={title} onPress={() => navigation.navigate(screenName)} />
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionButton: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'left',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default Home
