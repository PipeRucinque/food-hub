import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../styles/Register.css'

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [terms, setTerms] = useState(false)

    const handleSubmit = async (e) => {
        console.log('Pulsaste btn Log In ');
        e.preventDefault()
        if (!userName || !email || !password) {
            alert('All stages required')
        }

    const registerForm = await fetch('http://localhost:5000/registerform', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                userName: userName, 
                email: email,
                password: password,
            })
        }).then(res => res.json()).catch((err) => err)
          
        setUserName("")
        setEmail("")
        setPassword("")
        setTerms(false)

        if (registerForm.message) {
            alert('Ya te habias registrado.. LOSER!!!')
        } else {
            console.log('await fetch registerForm:', registerForm);
        }
    }



    return (
        <div className='registerForm'>
            <Form onSubmit={handleSubmit} action={'/'}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="User name" 
                        name='userName' 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <br />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Your email" 
                        name='email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        label="Acepto terminos y condiciones"
                        value={terms} 
                        onChange={(e) => setTerms(e.target.checked)}
                    />
                </Form.Group> */}
                {(!userName || !email || !password) 
                    ? <Button variant="outline-primary" type="submit" disabled>Log In</Button>
                    : <Button variant="primary" type="submit">Log In</Button>
                }  
            </Form>
        </div>
        );
}

export default Register