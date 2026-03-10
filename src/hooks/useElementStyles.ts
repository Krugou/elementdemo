import { useState, useCallback } from 'react';

export interface CSSProperties {
  color: string;
  backgroundColor: string;
  fontSize: number;
  padding: number;
  margin: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
}

const defaultStyles: CSSProperties = {
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 16,
  padding: 12,
  margin: 8,
  borderWidth: 1,
  borderColor: '#e2e8f0',
  borderRadius: 8,
};

export const useElementStyles = () => {
  const [styles, setStyles] = useState<CSSProperties>(defaultStyles);

  const updateStyle = useCallback(
    (property: keyof CSSProperties, value: string | number) => {
      setStyles((prev) => ({
        ...prev,
        [property]: value,
      }));
    },
    [],
  );

  const resetStyles = useCallback(() => {
    setStyles(defaultStyles);
  }, []);

  const reactStyle: React.CSSProperties = {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
    fontSize: `${styles.fontSize}px`,
    padding: `${styles.padding}px`,
    margin: `${styles.margin}px`,
    borderWidth: `${styles.borderWidth}px`,
    borderColor: styles.borderColor,
    borderRadius: `${styles.borderRadius}px`,
    borderStyle: 'solid',
    transition: 'all 0.1s ease-out',
  };

  return { styles, updateStyle, resetStyles, reactStyle };
};
