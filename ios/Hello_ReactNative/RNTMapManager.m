//
//  RNTMapManager.m
//  Hello_ReactNative
//
//  Created by 赵光飞 on 2020/8/11.
//

#import "RNTMapManager.h"
#import <MapKit/MapKit.h>

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view {
  return [[MKMapView alloc] init];
}

@end
