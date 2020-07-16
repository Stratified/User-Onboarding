import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import Users from './User';

const App = () => {
	const [users, setUsers] = useState([]);

	return (
		<div className='App'>
			<Form users={users} setUsers={setUsers} />
			<Users users={users} />
		</div>
	);
};

export default App;
