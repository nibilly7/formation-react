import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

const headers = ["", "NAME", "EMAIL", "LOCATION", "PHONE", "REGISTRATION DATE"]

function Customers() {
  const state = useContext(DataContext);
  const [elements, setElements] = useState(state.dataApp);
  const [elementsToDelete, setElementsToDelete] = useState([]);

  function searchChanged(parameters) {
    const search = parameters.target.value;
    setElements( state.dataApp.filter((element) => (
      element.name.includes(search)
    )));
  }

  function deleteElements() {
    console.log("deleteElements");
    setElements(elements.filter((element) => 
      !elementsToDelete.includes(element)
    ));
    state.setDataApp(state.dataApp.filter((element) => 
      !elementsToDelete.includes(element)
    ));
    setElementsToDelete([]);
  }

  function handleCheckElement(isItemSelected, element) {
    if(isItemSelected) {
      setElementsToDelete(elementsToDelete.filter((e) => e.id !== element.id));
    } else {
      setElementsToDelete([...elementsToDelete, element]);
    }
  }

  return (
    <div>
      <h2>Customers</h2>
      <form>
        <TextField id="outlined-basic" label="Search customer" variant="outlined" onChange={searchChanged}/>
      </form>
      <Button onClick={deleteElements} variant="contained">
        Delete
      </Button>
      {elementsToDelete && elementsToDelete.map((ele) =>  (
        <p key={ele.id}>{ele.id}</p>
      ))}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {elements && elements.map((element)=> {
            const isItemSelected = elementsToDelete.includes(element);
            return (
            <TableRow 
              key={element.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  onChange={() => handleCheckElement(isItemSelected, element)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {element.name}
              </TableCell>
              <TableCell>
                {element.email}
              </TableCell>
              <TableCell>
                {element.location}
              </TableCell>
              <TableCell>
                {element.phone}
              </TableCell>
              <TableCell>
                {element.registation_date}
              </TableCell>
            </TableRow>
            );}
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Customers;
  