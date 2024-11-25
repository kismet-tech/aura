import React from "react";
import { useEffect } from "react";

export const useWhyDidThisComponentUpdate = (name: string, props: any) => {
  const previousProps = React.useRef(props);

  useEffect(() => {
    if (previousProps.current !== props) {
      console.log(`[${name}] props changed:`, {
        prevProps: previousProps.current,
        newProps: props,
      });
      previousProps.current = props;
    }
  });
};
