import React, { useState, useEffect } from "react";

function Code() {
  const [code, setCode] = useState("");
  const [Data, setData] = useState("");

  function cleanCode(code) {
    // Remove leading and trailing white spaces
    code = code.trim();

    // Replace multiple spaces with a single space
    code = code.replace(/\s+/g, " ");

    // Add \n after semicolons
    code = code.replace(/;/g, ";\n");

    return code;
  }

  const handleGet = () => {
    fetch("http://localhost:8000/ide/submit/", {
      method: "get",
      headers: {
        Authorization: "Token " + sessionStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert(data.error);
        } else {
          console.log("Success");
          console.log(data[data.length - 1].output);
          setData(data[data.length - 1]);
          console.log(Data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRun = () => {
    fetch("http://localhost:8000/ide/submit/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        code: "#include <iostream>\nusing namespace std;\n" + cleanCode(code),
        language: "cpp",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert(data.error);
        } else {
          console.log("Success");
          console.log(data);
          setTimeout(() => {
            handleGet();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="code-container">
      <div className="flex">
        <h1>Algo IDE</h1>
        <button>Submissions</button>
      </div>
      <div>
        <div>
          <div className="flex">
            <h3>Input (In CPP)</h3>
            <button onClick={handleRun}>Run</button>
          </div>
          <div className="coloumn">
            <textarea
              name=""
              id=""
              cols="70"
              rows="3"
              value={"#include <iostream>\nusing namespace std;"}
              disabled="true"
            ></textarea>
            <textarea
              className="codetext"
              name=""
              id=""
              cols="70"
              rows="30"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex">
          <h3>Output:</h3>
          <span>{Data.output}</span>
        </div>
      </div>
    </div>
  );
}

export default Code;
