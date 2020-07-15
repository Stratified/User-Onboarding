import React, { useState, useEffect } from 'react';
import User from './User';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
	const defaultState = {
		name: '',
		email: '',
		password: '',
		terms: false,
	};

	const [form, setForm] = useState(defaultState);
	const [errors, setErrors] = useState({ ...defaultState, terms: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('https://reqres.in/api/users', form)
			.then((res) => console.log('Success: ', res))
			.catch((err) => console.log('Error: ', err));
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	let formSchema = yup.object().shape({
		name: yup.string().required('Name is required!'),
		email: yup.string().required().email('Email is required!'),
		password: yup.string().required('Password is required!'),
		terms: yup.boolean().oneOf([true], 'Please accept the ToS!'),
	});

	const validateSchema = (e) => {
		e.persists();
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) => setErrors({ ...errors, [e.target.name]: '' }))
			.catch((error) =>
				setErrors({ ...errors, [e.target.name]: error.errors[0] })
			);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label value='Name'>Name</label>
				<input
					type='text'
					name='name'
					placeholder='Name'
					value={form.name}
					onChange={handleChange}
					errors={errors}
				/>
				<label value='Password'>Password</label>
				<input
					type='text'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
					errors={errors}
				/>
				<label value='Email'>Email</label>
				<input
					type='text'
					name='email'
					placeholder='Email'
					value={form.email}
					onChange={handleChange}
					errors={errors}
				/>
				<label htmlFor='checkBox'>
					Terms and Conditions
					<input
						type='checkbox'
						name='terms'
						value={form.terms}
						onChange={handleChange}
						errors={errors}
					></input>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default Form;
