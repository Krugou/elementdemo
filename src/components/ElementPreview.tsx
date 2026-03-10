import React from 'react';

interface ElementPreviewProps {
  style: React.CSSProperties;
}

export const ElementPreview: React.FC<ElementPreviewProps> = ({ style }) => {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Element Preview</h2>
        <p className="text-gray-500 mt-1">
          All elements below are styled dynamically using the controls on the
          right.
        </p>
        <hr className="my-4 border-gray-200" />
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Typography</h3>
        <div className="space-y-4">
          <h1 style={style}>Heading 1</h1>
          <h2 style={style}>Heading 2</h2>
          <h3 style={style}>Heading 3</h3>
          <h4 style={style}>Heading 4</h4>
          <h5 style={style}>Heading 5</h5>
          <h6 style={style}>Heading 6</h6>
          <p style={style}>
            This is a <strong>paragraph</strong> with <em>emphasized</em> text,
            a <mark>marked</mark> word, and some <small>small text</small>. You
            can also see <del>deleted</del> and <ins>inserted</ins> text, as
            well as <sup>superscript</sup> and <sub>subscript</sub>.
          </p>
          <blockquote style={style}>
            "This is a blockquote element for quoting external sources."
          </blockquote>
          <address style={style}>
            Written by John Doe
            <br />
            Visit us at: example.com
          </address>
          <div className="flex flex-wrap gap-4">
            <a href="#" style={style}>
              Standard Link
            </a>
            <abbr title="HyperText Markup Language" style={style}>
              HTML (Abbreviation)
            </abbr>
            <cite style={style}>— Citation source</cite>
            <dfn style={style}>Definition term</dfn>
            <time style={style} dateTime="2026-03-10">
              March 10, 2026
            </time>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Interactive & Controls
        </h3>
        <div className="flex flex-wrap gap-4 items-start">
          <button style={style}>Action Button</button>
          <details style={style} className="cursor-pointer">
            <summary>Interactive Details (Click to expand)</summary>
            <p className="mt-2">
              This content is revealed when the details element is toggled open.
            </p>
          </details>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Forms & Inputs</h3>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset style={style} className="p-4 rounded border">
            <legend className="px-2 font-medium">Grouped Form Elements</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Text Input
                <input type="text" style={style} defaultValue="Editable text" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Password
                <input
                  type="password"
                  style={style}
                  defaultValue="password123"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Email
                <input
                  type="email"
                  style={style}
                  placeholder="email@example.com"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Number
                <input type="number" style={style} defaultValue="42" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Search
                <input type="search" style={style} placeholder="Search..." />
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Select Menu
                <select style={style}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm text-gray-600 col-span-full">
                Textarea
                <textarea
                  style={style}
                  rows={3}
                  defaultValue="Multi-line text input example..."
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" style={style} defaultChecked />
                <span className="text-sm">Checkbox</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="demo-radio"
                  style={style}
                  defaultChecked
                />
                <span className="text-sm">Radio A</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="demo-radio" style={style} />
                <span className="text-sm">Radio B</span>
              </label>
            </div>

            <div className="mt-6">
              <label className="flex flex-col gap-2 text-sm text-gray-600">
                Range Slider
                <input type="range" style={style} className="w-full" />
              </label>
            </div>
          </fieldset>
        </form>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Lists & Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Unordered List
            </h4>
            <ul style={style} className="list-disc list-inside">
              <li>First item in the list</li>
              <li>
                Second item with sub-list
                <ul className="pl-6 list-circle">
                  <li>Nested item A</li>
                  <li>Nested item B</li>
                </ul>
              </li>
              <li>Third item in the list</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Ordered List
            </h4>
            <ol style={style} className="list-decimal list-inside">
              <li>Primary step one</li>
              <li>Primary step two</li>
              <li>Primary step three</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Code & Technical
        </h3>
        <div className="space-y-4">
          <p>
            Inline code: <code style={style}>npm install tailwindcss</code>
          </p>
          <pre style={style} className="overflow-x-auto">
            {`function demo() {
  console.log("Hello HTML elements!");
}`}
          </pre>
          <p>
            Keyboard input: <kbd style={style}>Ctrl</kbd> +{' '}
            <kbd style={style}>C</kbd>
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Tables</h3>
        <div className="overflow-x-auto">
          <table style={style} className="w-full border-collapse">
            <thead>
              <tr>
                <th style={style} className="text-left font-bold">
                  Element
                </th>
                <th style={style} className="text-left font-bold">
                  Category
                </th>
                <th style={style} className="text-left font-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={style}>H1</td>
                <td style={style}>Typography</td>
                <td style={style}>Done</td>
              </tr>
              <tr>
                <td style={style}>Input</td>
                <td style={style}>Form</td>
                <td style={style}>Done</td>
              </tr>
              <tr>
                <td style={style}>Table</td>
                <td style={style}>Data</td>
                <td style={style}>Done</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Media & Figures</h3>
        <figure style={style} className="max-w-md mx-auto">
          <div className="bg-gray-200 w-full h-32 flex items-center justify-center text-gray-400 italic">
            Placeholder for Picture/Image
          </div>
          <figcaption style={style} className="mt-2 text-center text-sm italic">
            Figure 1: A demonstration of figure and figcaption elements.
          </figcaption>
        </figure>
      </section>

      <footer className="pt-8 text-center text-gray-400 text-sm">
        <hr className="mb-4" />
        <p>End of HTML Element Styling Demo</p>
      </footer>
    </div>
  );
};
