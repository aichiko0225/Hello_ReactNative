//
//  CalendarManager.m
//  Hello_ReactNative
//
//  Created by 赵光飞 on 2020/8/10.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager
{
  bool _hasListeners;
}

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(methodAddEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, testMethod)
{
  RCTLogInfo(@"%s", __func__);
  return @"";
}

- (void)testNativeMethod {
  RCTLogInfo(@"%s", __func__);
}

- (void)testNativeMethodWithText:(NSString *)text {
  RCTLogInfo(@"%s", __func__);
}

RCT_REMAP_METHOD(findEvents,
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *events = @[];
  if (events) {
    resolve(events);
  } else {
    NSError *error = [NSError errorWithDomain:@"123" code:-100 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}

// 在添加第一个监听函数时触发
-(void)startObserving {
    _hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    _hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (_hasListeners) {
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

@end
