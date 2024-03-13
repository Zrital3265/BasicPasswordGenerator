import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const App: React.FC = () => {
  //for the password length
  const [length, setLength] = useState<number>(8);
  //for the number checkbox
  const [numbersAdd, setNumbersAdd] = useState<boolean>(true);
  //  for the character checkbox
  const [characterAdd, setCharacterAdd] = useState<boolean>(false);
  // for the password gemeration
  const [password, setPassword] = useState<string>("");

  //new hook introduced useCallback(fn,[dependencies])
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    if (numbersAdd) string += "01234567890";
    if (characterAdd) string += "!@$%^&*_+~`/*-";

    for (let i = 1; i <= length; i++) {
      console.log(length);
      let character = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(character);
    }
    setPassword(pass);
  }, [length, numbersAdd, characterAdd, setPassword]);

  //useEffect hook introduced
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAdd, characterAdd, passwordGenerator]);

  //useRef hook introduced
  const passwordRef = useRef<HTMLInputElement>(null);

  const copyPasswordToClipBoard = useCallback((): void => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="min-h-screen text-center bg-black">
        <div className="bg-slate-950">
          <span className="inline-block p-3 mt-5 text-3xl font-extrabold text-green-500">
            Password Generator
          </span>
          <hr className="border-t border-green-400" />
        </div>
        <div className="w-full max-w-lg px-10 py-3 mx-auto my-5 text-xl font-bold text-white bg-gray-900 rounded-xl">
          Generate Password
          <div className="flex mb-4 overflow-hidden shadow">
            <input
              type="text"
              value={password}
              className="w-full px-3 py-1 my-1 font-semibold text-blue-600 rounded-lg outline-none text-md"
              placeholder="Password"
              readOnly={true}
              ref={passwordRef}
            ></input>
            <div>
              <button
                onClick={copyPasswordToClipBoard}
                className="flex items-center px-6 py-1 my-1 ml-3 font-medium bg-blue-600 rounded-md hover:bg-blue-500 group"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLength(Number(e.target.value));
                }}
              ></input>
              <label className="ml-2 font-mono text-green-300">
                Length:
                <div className="text-lg">({length})</div>
              </label>
            </div>
            <div className="flex items-center ml-2">
              <input
                type="checkbox"
                defaultChecked={numbersAdd}
                id="numberInput"
                onChange={() => {
                  setNumbersAdd((prev: boolean) => !prev);
                }}
              ></input>
              <label htmlFor="numberInput" className="ml-1 text-green-300">
                Numbers
              </label>
              <div className="flex items-center ml-2 ">
                <input
                  type="checkbox"
                  defaultChecked={characterAdd}
                  id="characterInput"
                  onChange={() => {
                    setCharacterAdd((prev: boolean) => !prev);
                  }}
                ></input>
                <label htmlFor="characterInput" className="ml-1 text-green-300">
                  Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
