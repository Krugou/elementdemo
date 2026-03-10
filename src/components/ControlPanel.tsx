import React, { useState } from 'react';
import { CSSProperties } from '../hooks/useElementStyles';

interface ControlPanelProps {
  styles: CSSProperties;
  onUpdate: (property: keyof CSSProperties, value: string | number) => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  styles,
  onUpdate,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const css = `.demo-element {
  color: ${styles.color};
  background-color: ${styles.backgroundColor};
  font-size: ${styles.fontSize}px;
  padding: ${styles.padding}px;
  margin: ${styles.margin}px;
  border: ${styles.borderWidth}px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const controls = [
    { label: 'Text Color', prop: 'color', type: 'color' },
    { label: 'Background', prop: 'backgroundColor', type: 'color' },
    { label: 'Border Color', prop: 'borderColor', type: 'color' },
    { label: 'Font Size', prop: 'fontSize', type: 'range', min: 8, max: 80 },
    { label: 'Padding', prop: 'padding', type: 'range', min: 0, max: 100 },
    { label: 'Margin', prop: 'margin', type: 'range', min: 0, max: 100 },
    {
      label: 'Border Width',
      prop: 'borderWidth',
      type: 'range',
      min: 0,
      max: 20,
    },
    {
      label: 'Border Radius',
      prop: 'borderRadius',
      type: 'range',
      min: 0,
      max: 100,
    },
  ];

  return (
    <div className="p-6 flex flex-col h-full space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">
          CONTROLS
        </h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Global Style Injector
        </p>
      </div>

      <div className="space-y-5 flex-1">
        {controls.map((ctrl) => (
          <div key={ctrl.prop} className="group">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                {ctrl.label}
              </label>
              {ctrl.type === 'range' && (
                <span className="text-[10px] font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                  {styles[ctrl.prop as keyof CSSProperties]}px
                </span>
              )}
            </div>
            {ctrl.type === 'color' ? (
              <div className="relative h-10 w-full rounded-lg overflow-hidden border border-slate-200 hover:border-blue-400 transition-all">
                <input
                  type="color"
                  value={styles[ctrl.prop as keyof CSSProperties] as string}
                  onChange={(e) =>
                    onUpdate(ctrl.prop as keyof CSSProperties, e.target.value)
                  }
                  className="absolute inset-0 w-[120%] h-[120%] -translate-x-1 -translate-y-1 cursor-pointer"
                />
              </div>
            ) : (
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                value={styles[ctrl.prop as keyof CSSProperties] as number}
                onChange={(e) =>
                  onUpdate(
                    ctrl.prop as keyof CSSProperties,
                    parseInt(e.target.value),
                  )
                }
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
              />
            )}
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200 space-y-3">
        <button
          onClick={generateCSS}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY CSS CONFIG'}
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
        >
          RESET TO DEFAULT
        </button>
      </div>
    </div>
  );
};
