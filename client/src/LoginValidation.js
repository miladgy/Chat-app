
const LoginValidation = (values) => {
  
        let errors = {};
        if (!values.name) {
          errors.name = 'Username is required';
        } else if (!/^[a-z0-9-_.]+$/gi.test(values.name)) {
          errors.name = 'Username is invalid; should contain letters, numbers, . and _';
        }
       
        return errors;
      };

export default LoginValidation; 
