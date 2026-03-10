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
    <div className="p-8 flex flex-col h-full space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Palette className="text-blue-600" size={20} />
          Design Controls
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-7">
          Style Injector
        </p>
      </div>

      <div className="space-y-12 flex-1 py-4">
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
            <div
              key={ctrl.prop}
              className="group flex flex-col gap-6 bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-widest group-hover:text-blue-600 transition-colors shrink-0">
                  <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    {ctrl.icon}
                  </span>
                  {ctrl.label}
                </label>

                {!isColor && isStyleObj && (
                  <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg text-[9px] font-bold tracking-wider border border-slate-200/50">
                      {(['px', 'rem', 'em'] as CssUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() =>
                            handleUnitChange(ctrl.prop, value as StyleValue, u)
                          }
                          className={`px-2 py-0.5 rounded-md transition-all ${currentUnit === u ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600 min-w-10 text-right">
                      {numValue}
                      <span className="text-[10px] text-slate-400 ml-0.5">
                        {currentUnit}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {isColor ? (
                <div className="relative h-10 w-full rounded-xl shadow-inner bg-slate-50 overflow-hidden border border-slate-200 hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100">
                  <input
                    type="color"
                    value={value as string}
                    onChange={(e) => onUpdate(ctrl.prop, e.target.value)}
                    className="absolute inset-0 w-[120%] h-[120%] -translate-x-1 -translate-y-1 cursor-pointer border-none bg-transparent"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4">
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
                    className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>
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
