import React from 'react';

interface Props {
  [key: string]: any;
}

function useWhyDidYouUpdate(name: string, props: Props) {
  const previousProps = React.useRef<Props>(props);

  React.useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });

      const changesObj: Props = {};

      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}

export default useWhyDidYouUpdate;
