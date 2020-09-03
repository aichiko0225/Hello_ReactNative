// 基础组件
import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  SectionList
} from 'react-native';
// import Constants from "expo-constants";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const SECTION_DATA = [
  {
    title: "Main dishes",
    data: [{ title: "Pizza" }, { title: "Burger" }, { title: "Risotto" }]
  },
  {
    title: "Sides",
    data: [{ title: "French Fries" }, { title: "Onion Rings" }, { title: "Fried Shrimps" }]
  },
  {
    title: "Drinks",
    data: [{ title: "Water" }, { title: "Coke" }, { title: "Beer" }]
  },
  {
    title: "Desserts",
    data: [{ title: "Cheese Cake" }, { title: "Ice Cream" }]
  }
];

const Item = ({ item, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

class ListComponents extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedId: ''
    }
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item }) {
    const backgroundColor = item.id == this.state.selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <Item
        style={{ backgroundColor }}
        item={item}
        onPress={() => this.setState({ selectedId: item.id })}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
            {'这里主要是介绍FlatList&SectionList'}
            </Text>
          </View>
        </ScrollView> */}
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={() => { }}
        />
        <SectionList
          sections={SECTION_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
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
  containTextView: {
    marginTop: 16,
    paddingHorizontal: 15,
  },
  containText: {
    color: Colors.black,
    fontSize: 14
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
});

export default ListComponents;

// FlatList

// 高性能的简单列表组件，支持下面这些常用的功能：

// 完全跨平台。
// 支持水平布局模式。
// 行组件显示或隐藏时可配置回调事件。
// 支持单独的头部组件。
// 支持单独的尾部组件。
// 支持自定义行间分隔线。
// 支持下拉刷新。
// 支持上拉加载。
// 支持跳转到指定行（ScrollToIndex）。
// 支持多列布局。


// 本组件实质是基于<VirtualizedList>组件的封装，继承了其所有 props（也包括所有<ScrollView>)的 props），
// 但在本文档中没有列出。此外还有下面这些需要注意的事项：

// 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
// 本组件继承自PureComponent而非通常的Component，这意味着如果其props在浅比较中是相等的，则不会重新渲染。
// 所以请先检查你的renderItem函数所依赖的props数据（包括data属性以及可能用到的父组件的 state），
// 如果是一个引用类型（Object 或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），
// 然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下js 中的基本类型和引用类型。）
// 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。
// 这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。
// 这是为了优化不得不作出的妥协，你可以根据自己的需求调整相应的参数，而我们也在设法持续改进。
// 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个keyExtractor函数来生成 key。


// SectionList

// 高性能的分组(section)列表组件，支持下面这些常用的功能：

// 完全跨平台。
// 行组件显示或隐藏时可配置回调事件。
// 支持单独的头部组件。
// 支持单独的尾部组件。
// 支持自定义行间分隔线。
// 支持分组的头部组件。
// 支持分组的分隔线。
// 支持多种数据源结构
// 支持下拉刷新。
// 支持上拉加载。
// 如果你的列表不需要分组(section)，那么可以使用结构更简单的<FlatList>。




