import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  ChevronRight,
  Search,
  Mail,
  Lock,
  Calendar,
  Settings,
  Copy,
  Check,
} from 'lucide-react';

interface ElementPreviewProps {
  style: React.CSSProperties;
}

const CopyButton: React.FC<{
  sectionName: string;
  style: React.CSSProperties;
}> = ({ sectionName, style }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const css = `.demo-${sectionName.toLowerCase().replace(/\s+/g, '-')} {
  color: ${style.color};
  background-color: ${style.backgroundColor};
  font-size: ${style.fontSize};
  padding: ${style.padding};
  margin: ${style.margin};
  border-width: ${style.borderWidth};
  border-color: ${style.borderColor};
  border-radius: ${style.borderRadius};
  border-style: solid;
}`;

    const tailwind = `text-[${style.color}] bg-[${style.backgroundColor}] text-[${style.fontSize}] p-[${style.padding}] m-[${style.margin}] border-[${style.borderWidth}] border-[${style.borderColor}] rounded-[${style.borderRadius}] border-solid`;

    const finalOutput = `/* CSS Block */\n${css}\n\n/* Tailwind Classes */\n${tailwind}`;

    navigator.clipboard.writeText(finalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 ${
        copied
          ? 'bg-emerald-500 text-white shadow-emerald-200'
          : 'bg-white text-slate-400 hover:text-blue-600 hover:bg-slate-50 border border-slate-200'
      }`}
      title={`Copy ${sectionName} CSS`}
    >
      {copied ? (
        <>
          <Check size={14} /> Copied
        </>
      ) : (
        <>
          <Copy size={14} /> Copy Style
        </>
      )}
    </button>
  );
};

export const ElementPreview: React.FC<ElementPreviewProps> = ({ style }) => {
  return (
    <div className="p-8 lg:p-16 space-y-32 w-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Element Canvas
        </h2>
        <p className="text-slate-500 font-medium">
          Live rendering of semantic HTML. Styles from the control panel apply
          directly via the{' '}
          <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded text-sm font-bold">
            style
          </code>{' '}
          prop.
        </p>
        <div className="w-full h-px bg-linear-to-r from-slate-200 to-transparent my-6" />
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <TypeIcon /> Typography
          </h3>
          <CopyButton sectionName="Typography" style={style} />
        </div>

        <div className="space-y-10 bg-slate-50 border border-slate-100 p-8 rounded-2xl">
          <div className="space-y-4 border-l-4 border-blue-500 pl-6">
            <h1 style={style}>Primary Display Heading</h1>
            <h2 style={style}>Secondary Section Title</h2>
            <h3 style={style}>Tertiary Subheading</h3>
          </div>

          <div className="space-y-4">
            <p style={style}>
              This is a standard <strong>paragraph</strong> element showing
              regular body text. We can include <em>emphasized</em> words,
              perhaps some{' '}
              <mark className="bg-yellow-200 px-1">highlighted</mark> terms, and
              an <abbr title="Abbreviation">ABBR</abbr> with a tooltip.
            </p>

            <blockquote
              style={style}
              className="border-l-4 border-indigo-500 pl-4 italic text-slate-600"
            >
              "The web's true power lies in its universality. Semantic HTML is
              the foundation of an accessible, indexable, and resilient digital
              world."
            </blockquote>
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
            <a
              href="#"
              style={style}
              className="flex items-center gap-1 hover:text-blue-700 font-medium transition-colors"
            >
              <Link2 size={16} /> Interactive Link
            </a>
            <span className="w-px h-4 bg-slate-200" />
            <time
              style={style}
              dateTime="2026-03-10"
              className="flex items-center gap-1 text-slate-500"
            >
              <Calendar size={16} /> Mar 10, 2026
            </time>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <InteractIcon /> Interactive Elements
          </h3>
          <CopyButton sectionName="Interactive" style={style} />
        </div>
        <div className="flex flex-wrap gap-8 items-start p-8 rounded-2xl border border-slate-200 shadow-sm bg-white">
          <button
            style={style}
            className="flex items-center gap-2 font-semibold"
          >
            <CheckCircle2 size={18} />
            Commit Changes
          </button>

          <details
            style={style}
            className="cursor-pointer group relative bg-slate-50"
          >
            <summary className="font-semibold flex items-center list-none gap-2 hover:text-blue-600 transition-colors">
              <ChevronRight
                size={18}
                className="transition-transform group-open:rotate-90"
              />
              Advanced Configuration
            </summary>
            <div className="mt-4 pt-4 border-t border-slate-200 text-slate-600 leading-relaxed">
              These settings control how the underlying rendering engine
              processes inline unit conversions and cross-browser
              normalizations.
            </div>
          </details>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FormIcon /> Forms & Inputs
          </h3>
          <CopyButton sectionName="Forms" style={style} />
        </div>
        <form
          className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <fieldset
            style={style}
            className="border-slate-300 relative pt-6 mt-4"
          >
            <legend className="px-3 font-bold text-slate-700 bg-white absolute -top-3 left-4">
              User Preferences
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <label className="flex flex-col gap-2 font-medium text-slate-700 focus-within:text-blue-600 transition-colors">
                <span className="flex items-center gap-1.5 text-sm">
                  <Mail size={16} /> Email Address
                </span>
                <input
                  type="email"
                  style={style}
                  placeholder="hello@example.com"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 transition-shadow"
                />
              </label>

              <label className="flex flex-col gap-2 font-medium text-slate-700 focus-within:text-blue-600 transition-colors">
                <span className="flex items-center gap-1.5 text-sm">
                  <Lock size={16} /> Secure Password
                </span>
                <input
                  type="password"
                  style={style}
                  defaultValue="password123"
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 transition-shadow"
                />
              </label>

              <label className="flex flex-col gap-2 font-medium text-slate-700 focus-within:text-blue-600 transition-colors">
                <span className="flex items-center gap-1.5 text-sm">
                  <Search size={16} /> Search Query
                </span>
                <input
                  type="search"
                  style={style}
                  placeholder="Find components..."
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 transition-shadow"
                />
              </label>

              <label className="flex flex-col gap-2 font-medium text-slate-700 focus-within:text-blue-600 transition-colors">
                <span className="flex items-center gap-1.5 text-sm">
                  <Settings size={16} /> Theme Setup
                </span>
                <select
                  style={style}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 transition-shadow cursor-pointer appearance-none bg-position-[calc(100%-1rem)_center] bg-size-[1.25em_1.25em] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat pr-10"
                >
                  <option>System Default (Auto)</option>
                  <option>Dark Mode</option>
                  <option>Light Mode</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 font-medium text-slate-700 col-span-full">
                <span className="text-sm">Biography</span>
                <textarea
                  style={style}
                  rows={3}
                  defaultValue="Developer passionate about web standards..."
                  className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 transition-shadow resize-y"
                />
              </label>
            </div>
          </fieldset>
        </form>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Code & Data
          </h3>
          <CopyButton sectionName="Code" style={style} />
        </div>

        <div className="bg-[#1e1e1e] text-white p-6 rounded-2xl shadow-inner font-mono text-sm leading-relaxed overflow-x-auto relative group">
          <div className="absolute top-4 right-4 text-slate-500 text-xs uppercase tracking-widest font-bold font-sans">
            TypeScript
          </div>
          <pre
            style={style}
            className="bg-transparent border-none text-[#d4d4d4]"
          >
            {`export const calculateMatrix = (a: number, b: number): number => {
  // Complex calculation simulation
  const result = Math.pow(a, 2) + Math.pow(b, 2);
  return Math.sqrt(result);
};`}
          </pre>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table style={style} className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th
                  style={style}
                  className="font-semibold text-slate-700 px-6 py-4"
                >
                  Property
                </th>
                <th
                  style={style}
                  className="font-semibold text-slate-700 px-6 py-4"
                >
                  Value
                </th>
                <th
                  style={style}
                  className="font-semibold text-slate-700 px-6 py-4"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td
                  style={style}
                  className="px-6 py-4 font-mono text-sm text-blue-600"
                >
                  border-radius
                </td>
                <td style={style} className="px-6 py-4 text-slate-600">
                  8px
                </td>
                <td
                  style={style}
                  className="px-6 py-4 text-emerald-600 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={16} /> Active
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td
                  style={style}
                  className="px-6 py-4 font-mono text-sm text-blue-600"
                >
                  padding
                </td>
                <td style={style} className="px-6 py-4 text-slate-600">
                  1.5rem
                </td>
                <td
                  style={style}
                  className="px-6 py-4 text-emerald-600 flex items-center gap-1.5"
                >
                  <CheckCircle2 size={16} /> Active
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="pt-12 pb-8 text-center text-slate-400 text-sm font-medium">
        <div className="w-16 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
        <p>Preview Environment &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

// Mini components for section headers
const TypeIcon = () => (
  <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
    <Settings size={14} />
  </span>
);
const InteractIcon = () => (
  <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg">
    <Link2 size={14} />
  </span>
);
const FormIcon = () => (
  <span className="bg-amber-100 text-amber-600 p-1.5 rounded-lg">
    <Search size={14} />
  </span>
);
