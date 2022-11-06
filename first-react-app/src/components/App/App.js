import './App.css';
import {useState} from "react";

function App() {
    const [input, setInput] = useState({
        firstName: "",
        lastName: ""
    });

    const handleChangeInput = (key, value) => {
        setInput(preInput => {
            return {
                ...preInput,
                [key]: value
            }
        })
    }

    return (
        <div>
            <input type="text" value={input.firstName} onChange={event => {
                handleChangeInput("firstName", event.target.value)
            }}/>

            <input type="text" value={input.lastName} onChange={event => {
                handleChangeInput("lastName", event.target.value)
            }}/>

            <button onClick={() => alert(JSON.stringify(input))}>
                Click Me
            </button>
        </div>
    );
}

export default App;
