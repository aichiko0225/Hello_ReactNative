// 基础组件
import React from 'react'
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class BaseComponents extends React.Component {
  
  constructor(props) {
    super(props)

    // 屏幕也可以更新其参数，就像它们可以更新其状态一样。
    // 该navigation.setParams方法使您可以更新屏幕的参数。
    // 有关更多详细信息，请参考API参考setParams。
    // var that = this
    // setTimeout(() => {
    //   that.props.navigation.setParams({
    //     otherParam: '23333333'
    //   })
    // }, 5000)

    this.state = {
      titleText: "Bird's Nest",
      bodyText: "This is not really a bird nest."
    };
  }

  render() {
    /* 2. Get the param */
    // const { itemId } = this.props.route.params;
    // const { otherParam } = this.props.route.params;
    return (
      <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={ {marginTop: 32, paddingHorizontal: 24} }>
        {/* <Text>
        {itemId}
        </Text>
        <Text>
        {otherParam}
        </Text> */}
        <Button title={'返回'} onPress={()=>{ this.props.navigation.goBack() }} />
        <Button title={'navigate to Home'} onPress={()=>{ this.props.navigation.navigate('Home') }} />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
        这里主要是介绍基础组件
        </Text>
      </View>
      <View style={styles.containTextView}>
        <Text style={styles.containText}>
        View作为创建 UI 时最基础的组件，View 是一个支持 Flexbox 布局、样式、一些触摸处理、和一些无障碍功能的容器，
        并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20
          }}>
          <View style={{ backgroundColor: "blue", flex: 0.3 }} />
          <View style={{ backgroundColor: "red", flex: 0.5 }} />
          <Text>Hello World!</Text>
        </View>

        <Text style={styles.containText}>
        {'\n'}
        Text一个用于显示文本的 React 组件，并且它也支持嵌套、样式，以及触摸处理.
        </Text>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {this.state.titleText}
            {"\n"}
            {"\n"}
          </Text>
          <Text numberOfLines={5}>{this.state.bodyText}</Text>
        </Text>

        <Text style={styles.baseText}>
          I am bold
          <Text style={styles.innerText}> and red</Text>
        </Text>
        <Text>
        {'\n'}
        嵌套视图（仅限 iOS）
        </Text>
        <Text>
          There is a blue square
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
          in between my text.
        </Text>

        <Text style={styles.containText}>
        {'\n'}
        Image用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。
        </Text>
        <View style={styles.container}>
          {/* <Image
            style={styles.tinyLogo}
            source={require('@expo/snack-static/react-native-logo.png')}
          /> */}
          <Image
            style={styles.tinyLogo}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
          <Image
            style={styles.logo}
            source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
          />
        </View>
        <Text>
          {'\n'}
          TextInput 文本输入框。
        </Text>
        <Text>
          {'\n'}
          ScrollView 可滚动的容器视图。
        </Text>
      </View>
      </ScrollView>
    )
  } 
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  innerText: {
    color: 'red'
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default BaseComponents;
