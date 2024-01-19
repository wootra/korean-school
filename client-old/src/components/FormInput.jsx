import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

const FormInput = ({
    register,
    name,
    type,
    errors,
    label,
    registerOptions,
}) => {
    return (
        <Form.Field>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                {...register(name, registerOptions)}
                placeholder={errors.email?.message}
            />
            {errors.email && (
                <Message
                    negative
                    size='tiny'
                    content={errors[name]?.message || 'Required'}
                />
            )}
        </Form.Field>
    );
};

FormInput.propTypes = {
    errors: PropTypes.shape({
        email: PropTypes.shape({
            message: PropTypes.string,
        }),
    }),
    label: PropTypes.string,
    name: PropTypes.string,
    register: PropTypes.func,
    registerOptions: PropTypes.any,
    type: PropTypes.any,
};

export default FormInput;
