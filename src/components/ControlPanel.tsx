import React from 'react';
import { CSSProperties } from '../hooks/useElementStyles';

interface ControlPanelProps {
  styles: CSSProperties;
  onUpdate: (property: keyof CSSProperties, value: string | number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  styles,
  onUpdate,
}) => {
  return (
    <div className="p-5 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Styling Controls</h2>
        <hr className="my-3 border-gray-300" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Text Color
          </label>
          <input
            type="color"
            value={styles.color}
            onChange={(e) => onUpdate('color', e.target.value)}
            className="w-10 h-10 p-0 border-0 cursor-pointer bg-transparent"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Background Color
          </label>
          <input
            type="color"
            value={styles.backgroundColor}
            onChange={(e) => onUpdate('backgroundColor', e.target.value)}
            className="w-10 h-10 p-0 border-0 cursor-pointer bg-transparent"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Font Size
            </label>
            <span className="text-xs text-gray-500">{styles.fontSize}px</span>
          </div>
          <input
            type="range"
            min="8"
            max="72"
            value={styles.fontSize}
            onChange={(e) => onUpdate('fontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">Padding</label>
            <span className="text-xs text-gray-500">{styles.padding}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={styles.padding}
            onChange={(e) => onUpdate('padding', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">Margin</label>
            <span className="text-xs text-gray-500">{styles.margin}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={styles.margin}
            onChange={(e) => onUpdate('margin', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Border Width
            </label>
            <span className="text-xs text-gray-500">
              {styles.borderWidth}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={styles.borderWidth}
            onChange={(e) => onUpdate('borderWidth', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Border Color
          </label>
          <input
            type="color"
            value={styles.borderColor}
            onChange={(e) => onUpdate('borderColor', e.target.value)}
            className="w-10 h-10 p-0 border-0 cursor-pointer bg-transparent"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">
              Border Radius
            </label>
            <span className="text-xs text-gray-500">
              {styles.borderRadius}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={styles.borderRadius}
            onChange={(e) => onUpdate('borderRadius', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
