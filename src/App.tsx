import React from 'react';
import { useElementStyles } from './hooks/useElementStyles';
import { ElementPreview } from './components/ElementPreview';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const { styles, updateStyle, reactStyle } = useElementStyles();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        <main className="flex-1 overflow-y-auto order-2 lg:order-1 bg-white">
          <ElementPreview style={reactStyle} />
        </main>
        <aside className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-l border-gray-200 bg-gray-50 order-1 lg:order-2 lg:h-auto lg:overflow-y-auto">
          <ControlPanel styles={styles} onUpdate={updateStyle} />
        </aside>
      </div>
    </div>
  );
}

export default App;
