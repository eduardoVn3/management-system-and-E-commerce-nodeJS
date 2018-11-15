module.exports = {
    name: [
        ['required', 'input name please']
    ],
    password: [
        ['minLength', 6, 'too short'],
        ['maxLength', 11, 'too long']
    ],
    rePassword: [
        ['custom', function(data) {
            if (data.password === '' ||
                data.rePassword === '' ||
                data.password === data.rePassword
            ) {
                return true;
            }
            return false;
        }, 'should be equal to password']
    ],
    email: [
        ['regexp', /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'input a right mail please'],
    ]
};
