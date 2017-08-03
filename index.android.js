/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import FileManager from 'react-native-filesystem';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ListView,
  TextInput,
  ToolbarAndroid,
  Button,
  Alert,
  Share,
  takeSnapshot
} from 'react-native';
const filePath = '/Order.txt';
const imgPath = '/Order.png';
const data = [
  {index: 0, name:"三黄鸡",unit:"只"},
  {index: 1, name:"青脚鸡",unit:"只"},
  {index: 2, name:"土母鸡",unit:"只"},
  {index: 3, name:"土公鸡",unit:"只"},
  {index: 4, name:"蛋鸡",unit:"只"},
  {index: 5, name:"茶花",unit:"只"},
  {index: 6, name:"脚环",unit:"只"},
  {index: 7, name:"草鸡",unit:"只"},
  {index: 8, name:"仔鸭",unit:"只"},
  {index: 9, name:"老鸭",unit:"只"},
  {index: 10, name:"兔子",unit:"个"},
  {index: 11, name:"鸡脚",unit:"包"},
  {index: 12, name:"血旺",unit:"斤"},
  {index: 13, name:"鸡胗",unit:"斤"},
  {index: 14, name:"鸭胗",unit:"斤"},
  {index: 15, name:"鸡爪",unit:"斤"},
  {index: 16, name:"鸡心",unit:"斤"},
  {index: 17, name:"鸡肝",unit:"斤"},
  {index: 18, name:"鸡翅",unit:"斤"}
];
export default class Order extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      result:"",
      data: data,
      dataSource: ds.cloneWithRows(data),
    };
  }

  onPressSaveData(){
      FileManager.writeToFile(filePath, JSON.stringify(this.state.dataSource))
      .then((data)=>{
          Alert.alert(
            '消息提示',
            '写入成功',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
      })
      .catch((data)=>{
          Alert.alert(
            '消息提示',
            '写入失败',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          );
      });
  }

  onPressShare(){
    var that =this;
      takeSnapshot(this.refs.orderList, {format: 'jpeg', quality: 0.8}).then(
       (uri) => {
         Alert.alert(
           '截屏',
           '截屏成功',
           [
             {text: 'OK', onPress: () => {
               Share.share({title:"今日下单信息",message:JSON.stringify(that.state.data)}).then(that._showResult).catch((error) => that.setState({result: 'error: ' + error.message}));
             }},
           ],
           { cancelable: false }
         );
       }
   ).catch(
       (error) => alert(error)
   );
  }

  _showResult(){
    Alert.alert(
      '消息提示',
      '分享成功',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false}
    )
  }

  onChangeNumber(){
    let data = this.state.data;
    data[index].value = this.getSource().getValue();
  }

  render() {
    let date = new Date();
    return (
      <ScrollView ref="view">
      <ToolbarAndroid
          logo={require('./react_native_logo.png')}
          title="下单"
          style={{height:56,backgroundColor:'#ffffff'}}>
      </ToolbarAndroid>
        <View  style={{width:"100%",backgroundColor:"lightgrey"}}><Text style={{textAlign:"center",fontWeight: 'bold'}}>{date.toLocaleDateString()}</Text></View>
        <ListView
          ref="orderList"
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{flex: 1, flexDirection: 'row',alignItems: 'flex-end',justifyContent: 'space-between',marginLeft: 20,marginRight: 20}}>
            <Text style={{width:"20%",fontSize: 16,fontWeight: 'bold'}}>{rowData.name}</Text>
            <TextInput style={{width:"30%"}} keyboardType="numeric" value={rowData.value} onChangeText={(text) => {
              let data = this.state.data;
              data[rowData.index].value = text;
            }}></TextInput>
            <Text style={{width:"10%"}}>{rowData.unit}</Text>
          </View>}
        />
        <Button
          onPress={this.onPressSaveData.bind(this)}
          title="保存"
          style={{marginTop: 20}}
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.onPressShare.bind(this)}
          title="分享"
          style={{marginTop: 20}}
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Order', () => Order);
