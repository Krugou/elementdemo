import React from 'react';
import { useElementStyles } from './hooks/useElementStyles';
import { ElementPreview } from './components/ElementPreview';
import { ControlPanel } from './components/ControlPanel';
import { LayoutTemplate } from 'lucide-react';

function App() {
  const { styles, updateStyle, resetStyles, reactStyle } = useElementStyles();

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 lg:p-16 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      <div className="max-w-none mx-auto flex flex-col h-full min-h-[calc(100vh-5rem)] bg-white shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-200 ring-1 ring-black/5">
        {/* App Header */}
        <header className="px-10 py-8 border-b border-slate-200 bg-white flex items-center gap-4">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-inner shadow-blue-800/30">
            <LayoutTemplate className="text-white" size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              ElementDemo
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Professional HTML Styling Environment
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto order-2 lg:order-1 bg-white relative">
            <ElementPreview style={reactStyle} />
          </main>

          <aside className="w-full lg:w-[500px] lg:shrink-0 border-b lg:border-b-0 lg:border-l border-slate-200 bg-slate-50/50 order-1 lg:order-2 lg:h-auto lg:overflow-y-auto">
            <ControlPanel
              styles={styles}
              onUpdate={updateStyle}
              onReset={resetStyles}
            />
          </aside>
        </div>

        {/* App Footer */}
        <footer className="px-10 py-4 border-t border-slate-200 bg-slate-50/30 flex justify-between items-center">
          <p className="text-xs font-medium text-slate-400">
            Build time: {new Date(__BUILD_TIME__).toLocaleString()}
          </p>
          <p className="text-xs font-medium text-slate-400">
            &copy; {new Date().getFullYear()} ElementDemo
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
