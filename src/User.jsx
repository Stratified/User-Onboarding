import React from 'react';

const User = (props) => {
	return (
		<div>
			{props.users.map((user) => (
				<div key={user.id}>
					<h2>Name: {user.name}</h2>
					<p>Email: {user.email}</p>
					<p>Password: {user.password}</p>
				</div>
			))}
		</div>
	);
};

export default User;
