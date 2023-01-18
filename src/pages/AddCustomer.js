import './AddCustomer.css';
import { Box, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { useContext, useState } from 'react';
import { DataContext } from '../DataContext';

function AddCustomer() {
    const state = useContext(DataContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [registrationDateError, setRegistrationDateError] = useState(false);

    const registrationDateRegex = /^(([0-9]){2}-){2}([0-9]){4}$/g;

    function handleRegistrationDate(event) {
        const value = event.target.value;
       setRegistrationDate(value)
       console.log(value.match(registrationDateRegex));
       if (null === value.match(registrationDateRegex)) {
        setRegistrationDateError(true);
       } else {
        setRegistrationDateError(false);
       }
    }

    function validate() {
        let idMax = -1;
        state.dataApp.forEach((customer) => {
            if (+customer.id > idMax) {
                idMax = customer.id;
            }
        });
        const newCustomer = {
            id: 1 + +idMax,
            name,
            email,
            location,
            phone,
            registrationDate,
        };
        state.setDataApp([...state.dataApp, newCustomer]);
    }

    return (
        <div>
            {state && state.dataApp && state.dataApp.map((customer) => (
                <div key={customer.id}>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                </div>
            ))}
            <h2>Account</h2>
            <Box
            component="form"
            noValidate
            autoComplete="off"
            >
                <Card className="my-card">
                    <CardContent>
                        <TextField 
                            className='my-textfield' 
                            label="Name" 
                            value={name} 
                            onChange={(event) => setName(event.target.value)} />
                        <TextField 
                            className='my-textfield' 
                            label="Email" 
                            value={email} 
                            onChange={(event) => setEmail(event.target.value)} />
                        <TextField 
                            className='my-textfield' 
                            label="Location" 
                            value={location} 
                            onChange={(event) => setLocation(event.target.value)} />
                        <TextField 
                            className='my-textfield' 
                            label="Phone" 
                            value={phone} 
                            onChange={(event) => setPhone(event.target.value)} />
                        <TextField 
                            error={registrationDateError}
                            className='my-textfield'
                            label="Registration date" 
                            value={registrationDate} 
                            helperText="DD-MM-YYYY"
                            onChange={handleRegistrationDate}
                            />
                    </CardContent>
                    <CardActions>
                        <Button onClick={validate}>Validate</Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    );
}

export default AddCustomer;