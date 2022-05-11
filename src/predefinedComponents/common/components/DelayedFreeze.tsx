import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Freeze } from 'react-freeze';
import { View } from 'react-native';

interface DelayedFreezeProps {
  containerWidth?: number;
  freeze: boolean;
}

/**
 * Taken from react-native-screens index.native.tsx and enhanced to handle tabs content inside horizontal ScrollView
 * https://github.com/software-mansion/react-native-screens/blob/14ea88d1fabab0429164246410bd4131201407e9/src/index.native.tsx#L160#L175
 */
export const DelayedFreeze: FC<DelayedFreezeProps> = ({ children, containerWidth, freeze }) => {
  const [freezeState, setFreezeState] = useState(false);
  const freezeBlockRef = useRef<ReturnType<typeof setImmediate>>();

  useEffect(() => {
    return () => {
      if (freezeBlockRef.current) {
        clearImmediate(freezeBlockRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (freeze !== freezeState) {
      // setImmediate is executed at the end of the JS execution block.
      // Used here for changing the state right after the render.
      freezeBlockRef.current = setImmediate(() => {
        setFreezeState(freeze);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeze]);

  return (
    <Freeze
      freeze={freeze ? freezeState : false}
      placeholder={<View style={{ width: containerWidth }} />}>
      {children}
    </Freeze>
  );
};
