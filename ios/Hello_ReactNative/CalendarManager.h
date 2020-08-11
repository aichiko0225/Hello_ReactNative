//
//  CalendarManager.h
//  Hello_ReactNative
//
//  Created by 赵光飞 on 2020/8/10.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

/// 给 JavaScript 端发送事件
/// 即使没有被 JavaScript 调用，原生模块也可以给 JavaScript 发送事件通知。
/// 最好的方法是继承RCTEventEmitter，实现suppportEvents方法并调用self sendEventWithName:。

@interface CalendarManager : RCTEventEmitter<RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
