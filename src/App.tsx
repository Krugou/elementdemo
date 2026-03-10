import React from 'react';
import { useElementStyles } from './hooks/useElementStyles';
import { ElementPreview } from './components/ElementPreview';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const { styles, updateStyle, reactStyle } = useElementStyles();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <main className="flex-1 overflow-y-auto order-2 lg:order-1">
        <ElementPreview style={reactStyle} />
      </main>
      <aside className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-l border-gray-200 bg-gray-50 order-1 lg:order-2 sticky top-0 z-10 lg:h-screen lg:overflow-y-auto">
        <ControlPanel styles={styles} onUpdate={updateStyle} />
      </aside>
    </div>
  );
}

export default App;
