import React, { useState } from 'react';
import data from "./data.json";

export const DataContext = React.createContext({
  dataApp: data.data,
  setDataApp: () => {}
})

export const DataContextProvider = (props) => {

  const setDataApp = (dataApp) => {
    setState({...state, dataApp: dataApp})
  }

  const initState = {
    dataApp: data.data,
    setDataApp: setDataApp
  } 

  const [state, setState] = useState(initState)

  return (
    <DataContext.Provider value={state}>
      {props.children}
    </DataContext.Provider>
  )
}