import Prism from "prismjs";
import "prismjs/components/prism-clike.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-scss.js";
import sources from "./codeShowcaseSources.json";

type TabId = keyof typeof sources;

const TABS: { id: TabId; label: string; lang: "jsx" | "javascript" | "scss" }[] = [
  { id: "index", label: "index.jsx", lang: "jsx" },
  { id: "reducers", label: "redux/reducers/network.js", lang: "javascript" },
  { id: "searchbar", label: "SearchBar/index.jsx", lang: "jsx" },
  { id: "usstate", label: "USA/USState/index.jsx", lang: "jsx" },
  { id: "networkmembers", label: "NetworkMembers/index.jsx", lang: "javascript" },
  { id: "styles", label: "_coverage-map.scss", lang: "scss" },
];

function highlight(code: string, lang: "jsx" | "javascript" | "scss") {
  return Prism.highlight(code, Prism.languages[lang], lang);
}

function LineNumbers({ code }: { readonly code: string }) {
  const lineCount = code.split("\n").length;
  return (
    <span className="line-numbers-rows" aria-hidden="true">
      {Array.from({ length: lineCount }, (_, i) => (
        <span key={i} />
      ))}
    </span>
  );
}

export function CodeShowcase() {
  return (
    <div className="code-showcase">
      {TABS.map((tab, index) => (
        <input
          key={tab.id}
          className="code-showcase__radio"
          type="radio"
          name="cm-tab"
          id={`cm-tab-${tab.id}`}
          defaultChecked={index === 0}
        />
      ))}

      <div className="code-showcase__tabs">
        {TABS.map((tab) => (
          <label key={tab.id} htmlFor={`cm-tab-${tab.id}`}>
            {tab.label}
          </label>
        ))}
      </div>

      <div className="code-showcase__panels">
        {TABS.map((tab) => (
          <pre className="code-showcase__panel" data-tab={tab.id} key={tab.id}>
            <LineNumbers code={sources[tab.id]} />
            <code
              className={`language-${tab.lang}`}
              dangerouslySetInnerHTML={{
                __html: highlight(sources[tab.id], tab.lang),
              }}
            />
          </pre>
        ))}
      </div>

      <p className="code-showcase__caption">
        Source for the live demo above, plain JS like the production
        version. Real Redux there called real APIs; here a small
        hand-rolled store (redux/store.js) and mock data stand in for
        both.
      </p>
    </div>
  );
}
