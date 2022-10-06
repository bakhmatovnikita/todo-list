import React from 'react';
import { useState, useEffect } from 'react';

export const DataContext = React.createContext([]);

export function DataList(props) {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('item');
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    // console.log(data);
  }, [data]);
  return <DataContext.Provider value={[data, setData]}>{props.children}</DataContext.Provider>;
}
