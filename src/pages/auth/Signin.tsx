import React from 'react';

import Form from '../../shared/Form';

function Signin() {
    function handleSignin(e: React.FormEvent) {
        e.preventDefault();
    };

    return (
       <Form fields={2} handler={handleSignin} /> 
    )
}

export default Signin;