import { render, h } from 'preact';
import { useState } from 'preact/hooks';

/** @jsx h */

const App = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <p>Do you agree to the statement: "Preact is awesome"?</p>
      <input value={input} onInput={e => setInput(e.target.value)} />
    </div>
  )
}

render(<App />, document.body);
