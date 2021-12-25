import React, { useState } from 'react';
import './index.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button type="button" onClick={() => setCount(count + 1)}>
                2
            </button>
        </div>
    );
}

export default App;
