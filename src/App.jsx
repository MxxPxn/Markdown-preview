import { marked } from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';
import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [editorContent, setEditorContent] = useState(`# Welcome to my Markdown Previewer!
  ## This is a sub-heading...
  ### And here's some other cool stuff:

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is multi-line code:

  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

World's largest countries by area:

Country | Area (km²) | Population | Capital City
------- | ---------- | ---------- | ------------
Ukraine | 603,550 | 44 million | Kyiv
Canada | 9,984,670 | 38 million | Ottawa
United States | 9,833,517 | 331 million | Washington D.C.
France | 643,801 | 68 million | Paris
Brazil | 8,514,877 | 215 million | Brasília
Australia | 7,692,024 | 26 million | Canberra

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`);

  hljs.configure({
    ignoreUnescapedHTML: true
  });

  marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch (err) {
          console.error('Highlight error:', err);
        }
      }
      try {
        return hljs.highlightAuto(code).value;
      } catch (err) {
        console.error('Auto highlight error:', err);
        return code;
      }
    },
    breaks: true,
    gfm: true
  });

  const handleEditorChange = (event) => {
    setEditorContent(event.target.value);
  };

  const html = marked.parse(editorContent);
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [html]);


  return (
    <div className="app">
      <div className="editor__wrapper">
      
        <textarea
          id="editor"
          className="editor__block"
          value={editorContent}
          onChange={handleEditorChange}>
        </textarea>
      </div>

      <div className="preview__wrapper">
      
        <div
          id="preview"
          className="preview__block"
          dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>
      </div>
    </div>
  );
}
export default App;