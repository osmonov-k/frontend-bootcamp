import React from 'react';
import { useState } from 'react';

const GenerateTable = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [table, setTable] = useState<number[][]>([]);

  const hanleRowChange = (e) => {
    setRows(e.target.value);
  };

  const hanleColChange = (e) => {
    setCols(e.target.value);
  };

  const hanleSubmit = () => {
    if (rows <= 0) return;
    if (cols <= 0) return;
    // setTable(() => {
    //     return Array.from({length: rows}, () => Array.from({length: cols}, (,_i) => i ));
    // })
    const tempTable: number[][] = [];
    for (let r = 0; r < rows; r++) {
      tempTable[r] = [];
      for (let c = 0; c < cols; c++) {
        tempTable[r][c] = r * cols + c;
      }
    }
    setTable(tempTable);
  };

  return (
    <div>
      GenerateTable
      <input value={rows} onChange={hanleRowChange} />
      <input value={cols} onChange={hanleColChange} />
      <button onClick={hanleSubmit}>Submit</button>
      <div style={{}}>
        {table.map((row, rowIndex) => (
          <div style={{ display: 'flex' }}>
            {table[rowIndex].map((col, colIndex) => (
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  border: '1px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {table[rowIndex][colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateTable;
