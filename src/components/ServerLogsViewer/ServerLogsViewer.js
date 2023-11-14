import React, { useState, useEffect } from 'react';
import './ServerLogsViewer.css';

var Convert = require('ansi-to-html');
var convert = new Convert();



function Logs() {

    const [data, setData] = useState('Waiting for server logs...');
    const [dotClass, setDotClass]  = useState('green-dot')

    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1080/v1/dolus/logs');
        const result = await response.text();
        const modifiedData = result.split('\n').map((line, index) => convert.toHtml(line)).join('<br>')
        setData(modifiedData)
        setDotClass('green-dot')

      } catch (error) {
        setDotClass('red-dot')
      }
    };

    useEffect(() => {
        // Fetch data initially when the component mounts
        
        fetchData();
    
        // Set up a recurring timer to fetch data every 5 seconds
        const intervalId = setInterval(() => {
          fetchData();
        }, 5000);
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, []); // The empty dependency array ensures that this effect runs only once on mount
    
      function getTitle(className) {
        if (className === "green-dot") {
            return "Connected"
        }
        return "Disconnected"
      }
        
        return (
            <div className="terminal" >
              <div className="header"> <span className={dotClass} title={getTitle(dotClass)}></span> Server Logs</div>
                <div className="output-container" id="output-container" dangerouslySetInnerHTML={{ __html: data }} >
                    
              </div>
            </div>
          );
    

}


export default Logs;