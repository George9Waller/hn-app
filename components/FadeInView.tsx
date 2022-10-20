import React, { useRef, useEffect } from "react";
import { Animated, StyleProp, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: Object;
}

const FadeInView = ({ children, style }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 100000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
