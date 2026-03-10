import { useState, useCallback } from 'react';

export type CssUnit = 'px' | 'rem' | 'em';

export interface StyleValue {
  value: number;
  unit: CssUnit;
}

export interface CSSProperties {
  color: string;
  backgroundColor: string;
  fontSize: StyleValue;
  padding: StyleValue;
  margin: StyleValue;
  borderWidth: StyleValue;
  borderColor: string;
  borderRadius: StyleValue;
}

const defaultStyles: CSSProperties = {
  color: '#0f172a',
  backgroundColor: '#f8fafc',
  fontSize: { value: 16, unit: 'px' },
  padding: { value: 0, unit: 'px' },
  margin: { value: 0, unit: 'px' },
  borderWidth: { value: 0, unit: 'px' },
  borderColor: '#e2e8f0',
  borderRadius: { value: 0, unit: 'px' },
};

export const useElementStyles = () => {
  const [styles, setStyles] = useState<CSSProperties>(defaultStyles);

  const updateStyle = useCallback(
    (property: keyof CSSProperties, value: string | number | StyleValue) => {
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
    fontSize: `${styles.fontSize.value}${styles.fontSize.unit}`,
    padding: `${styles.padding.value}${styles.padding.unit}`,
    margin: `${styles.margin.value}${styles.margin.unit}`,
    borderWidth: `${styles.borderWidth.value}${styles.borderWidth.unit}`,
    borderColor: styles.borderColor,
    borderRadius: `${styles.borderRadius.value}${styles.borderRadius.unit}`,
    borderStyle: 'solid',
    transition: 'all 0.1s ease-out',
  };

  return { styles, updateStyle, resetStyles, reactStyle };
};
