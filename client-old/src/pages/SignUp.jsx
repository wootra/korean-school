import { useForm, Form as ReactHookForm } from 'react-hook-form';

import { Button, Grid, Image, Message } from 'semantic-ui-react';
import logo from '/logo.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SERVER_URL } from '../env';
import { EMAIL_PATTERN } from '../utils/emailPattern';
import { useEffect, useState } from 'react';
import FormInput from '../components/FormInput';
import { useLoginInfo } from '../contexts/LoginContext';

const schema = yup
    .object({
        email: yup.string().required().email(),
        password: yup.string().required(),
        name: yup.string().required(),
        user_id: yup.string().required(),
    })
    .required();

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        // defaultValues: { email: '', password: '' },
        resolver: yupResolver(schema),
    });
    const { setUser } = useLoginInfo();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (
            location.state?.from === 'sign-up' ||
            location.state?.from === 'sign-in'
        ) {
            navigate('/home');
        }
    }, [location, location.state?.from, navigate]);

    const onSubmit = (data, values) => {
        fetch(`${SERVER_URL}/api/sign-up`, {
            method: 'POST',
            // should not add content-type explicitly.
            // Content-Type is automatically generated
            // along with the boundary string.
            // with below content-type setting,
            // form data is not sent to the server.
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
            body: values.formData,
        })
            .then(async res => {
                const ret = await res.json();
                if (!res.ok) throw new Error(ret.error);
                return ret;
            })
            .then(res => {
                setUser(res);
                navigate(-1, { state: { from: 'sign-up' } });
            })
            .catch(err => setError(err?.message ?? err));
    };

    return (
        <div className='full-size dimmed-background place-center'>
            <Grid className='center-modal bg-white rounded-lg'>
                <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    verticalAlign='middle'
                >
                    <Image src={logo} size='medium' className='mx-auto' />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <h1 className='mb-4 text-right uppercase text-sm font-extrabold text-slate-400'>
                        Sign Up
                    </h1>

                    <ReactHookForm
                        onSubmit={handleSubmit(onSubmit)}
                        // action={`${SERVER_URL}/api/sign-up`}
                        // method='post'
                        control={control}
                        // onSuccess={() => {
                        //     console.log('success');
                        // }}
                        // onError={() => {
                        //     console.log('error');
                        // }}
                        className='unset-position ui form'
                    >
                        <FormInput
                            name='email'
                            type='email'
                            label='Email'
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: true,
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: "Email doesn't match pattern",
                                },
                            }}
                        />
                        <FormInput
                            name='password'
                            type='password'
                            label='Password'
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: true,
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                            }}
                        />
                        <FormInput
                            name='name'
                            type='text'
                            label='Name'
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: true,
                            }}
                        />
                        <FormInput
                            name='user_id'
                            type='text'
                            label='User ID'
                            register={register}
                            errors={errors}
                            registerOptions={{
                                required: true,
                            }}
                        />
                        {error && (
                            <Message negative size='tiny' content={error} />
                        )}
                        <div className='h-16 w-full'></div>
                        <div className='flex items-center justify-between h-16 absolute bottom-0 right-0 w-full pb-4 pr-4'>
                            <NavLink
                                to='/log-in'
                                className='text-sm text-blue-500 hover:text-blue-700'
                                replace
                            >
                                I already have an account
                            </NavLink>
                            <Button type='submit' primary>
                                Submit
                            </Button>
                        </div>
                    </ReactHookForm>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default SignUp;
