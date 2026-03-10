import React, { useState } from 'react';
import { CSSProperties, StyleValue, CssUnit } from '../hooks/useElementStyles';
import {
  Palette,
  Type,
  Square,
  Maximize,
  Copy,
  RotateCcw,
  Box,
} from 'lucide-react';

interface ControlPanelProps {
  styles: CSSProperties;
  onUpdate: (
    property: keyof CSSProperties,
    value: string | number | StyleValue,
  ) => void;
  onReset: () => void;
}

interface ControlDef {
  label: string;
  prop: keyof CSSProperties;
  type: 'color' | 'range';
  min?: number;
  max?: number;
  icon: React.ReactNode;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  styles,
  onUpdate,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const formatStyleValue = (val: string | StyleValue) => {
    if (typeof val === 'string') return val;
    return `${val.value}${val.unit}`;
  };

  const generateCSS = () => {
    const css = `.demo-element {
  color: ${styles.color};
  background-color: ${styles.backgroundColor};
  font-size: ${formatStyleValue(styles.fontSize)};
  padding: ${formatStyleValue(styles.padding)};
  margin: ${formatStyleValue(styles.margin)};
  border: ${formatStyleValue(styles.borderWidth)} solid ${styles.borderColor};
  border-radius: ${formatStyleValue(styles.borderRadius)};
}`;

    const tailwind = `text-[${styles.color}] bg-[${styles.backgroundColor}] text-[${formatStyleValue(
      styles.fontSize,
    )}] p-[${formatStyleValue(styles.padding)}] m-[${formatStyleValue(
      styles.margin,
    )}] border-[${formatStyleValue(styles.borderWidth)}] border-[${
      styles.borderColor
    }] rounded-[${formatStyleValue(styles.borderRadius)}] border-solid`;

    const finalOutput = `/* CSS Block */\n${css}\n\n/* Tailwind Classes */\n${tailwind}`;

    navigator.clipboard.writeText(finalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const controls: ControlDef[] = [
    {
      label: 'Text Color',
      prop: 'color',
      type: 'color',
      icon: <Type size={14} />,
    },
    {
      label: 'Background',
      prop: 'backgroundColor',
      type: 'color',
      icon: <Palette size={14} />,
    },
    {
      label: 'Border Color',
      prop: 'borderColor',
      type: 'color',
      icon: <Square size={14} />,
    },
    {
      label: 'Font Size',
      prop: 'fontSize',
      type: 'range',
      min: 8,
      max: 80,
      icon: <Type size={14} />,
    },
    {
      label: 'Padding',
      prop: 'padding',
      type: 'range',
      min: 0,
      max: 100,
      icon: <Maximize size={14} />,
    },
    {
      label: 'Margin',
      prop: 'margin',
      type: 'range',
      min: 0,
      max: 100,
      icon: <Box size={14} />,
    },
    {
      label: 'Border Width',
      prop: 'borderWidth',
      type: 'range',
      min: 0,
      max: 20,
      icon: <Square size={14} />,
    },
    {
      label: 'Border Radius',
      prop: 'borderRadius',
      type: 'range',
      min: 0,
      max: 100,
      icon: <Square size={14} />,
    },
  ];

  const handleUnitChange = (
    prop: keyof CSSProperties,
    styleObj: StyleValue,
    newUnit: CssUnit,
  ) => {
    onUpdate(prop, { ...styleObj, unit: newUnit });
  };

  return (
    <div className="p-10 flex flex-col h-full space-y-12 bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Palette className="text-blue-600" size={20} />
          Design Controls
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-7">
          Style Injector
        </p>
      </div>

      <div className="space-y-10 flex-1">
        {controls.map((ctrl) => {
          const isColor = ctrl.type === 'color';
          const value = styles[ctrl.prop];
          const isStyleObj = !isColor && typeof value === 'object';
          const numValue = isStyleObj
            ? (value as StyleValue).value
            : typeof value === 'number'
              ? value
              : 0;
          const currentUnit = isStyleObj ? (value as StyleValue).unit : '';

          return (
            <div key={ctrl.prop} className="group flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                  <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    {ctrl.icon}
                  </span>
                  {ctrl.label}
                </label>

                {!isColor && isStyleObj && (
                  <div className="flex items-center gap-2">
                    <div className="flex bg-slate-200/80 p-0.5 rounded-md text-[10px] font-bold tracking-wider">
                      {(['px', 'rem', 'em'] as CssUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() =>
                            handleUnitChange(ctrl.prop, value as StyleValue, u)
                          }
                          className={`px-1.5 py-0.5 rounded-sm transition-all ${currentUnit === u ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-600 w-10 text-right">
                      {numValue}
                      {currentUnit}
                    </span>
                  </div>
                )}
              </div>

              {isColor ? (
                <div className="relative h-10 w-full rounded-lg shadow-sm overflow-hidden border border-slate-200 hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100">
                  <input
                    type="color"
                    value={value as string}
                    onChange={(e) => onUpdate(ctrl.prop, e.target.value)}
                    className="absolute inset-0 w-[120%] h-[120%] -translate-x-1 -translate-y-1 cursor-pointer"
                  />
                </div>
              ) : (
                <input
                  type="range"
                  min={ctrl.min}
                  max={ctrl.max}
                  value={numValue}
                  onChange={(e) =>
                    isStyleObj
                      ? onUpdate(ctrl.prop, {
                          ...(value as StyleValue),
                          value: parseInt(e.target.value),
                        })
                      : onUpdate(ctrl.prop, parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-slate-200 space-y-3">
        <button
          onClick={generateCSS}
          className={`w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98] ${
            copied
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-2">
              ✓ COPIED TO CLIPBOARD
            </span>
          ) : (
            <>
              <Copy size={16} /> COPY CSS CONFIG
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all active:scale-[0.98]"
        >
          <RotateCcw size={16} /> RESET TO DEFAULT
        </button>
      </div>
    </div>
  );
};
