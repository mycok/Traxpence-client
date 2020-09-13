import React from 'react';

import Form from '../../shared/Form';

function Signup() {
    function handleSignup(e: React.FormEvent) {
        e.preventDefault();
    };

    return (
       <Form fields={3} handler={handleSignup}/> 
    )
}

export default Signup;