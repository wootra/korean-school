import { EMAIL_PATTERN } from './emailPattern';

export const emailValidation = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!EMAIL_PATTERN.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
