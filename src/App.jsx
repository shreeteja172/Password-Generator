import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberChecked, setNumberChecked] = useState(true);
  const [charactersChecked, setCharactersChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberChecked) str += "0123456789";
    if (charactersChecked) str += "!@#$%^&*()-_=+[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopy("Copy");
  }, [length, numberChecked, charactersChecked]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    setCopy("Copied!");
    setTimeout(() => setCopy("Copy"), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberChecked, charactersChecked, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-white text-center">Password Generator</h1>
        
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-inner">
          <input
            type="text"
            value={password}
            className="flex-1 bg-transparent text-white py-3 px-4 focus:outline-none font-mono text-sm"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 transition-colors duration-200"
          >
            {copy}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="range"
              value={length}
              min={8}
              max={50}
              className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer accent-blue-600"
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="text-white font-medium w-20">Length: {length}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={numberChecked}
                id="Numberinput"
                className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                onChange={() => setNumberChecked((prev) => !prev)}
              />
              Numbers
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={charactersChecked}
                id="charinput"
                className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                onChange={() => setCharactersChecked((prev) => !prev)}
              />
              Special Chars
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;