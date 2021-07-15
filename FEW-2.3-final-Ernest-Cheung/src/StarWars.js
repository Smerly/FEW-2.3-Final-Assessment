import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { save } from './actions';

function StarWars() {
	const dispatch = useDispatch();
	const [id, setId] = useState(null);
	const [ids, setIds] = useState('1');
	const [saved, setSaved] = useState([]);
	const [data, setData] = useState(null);

	const path = `https://swapi.dev/api/people/${ids}/`;
	const chars = useSelector((state) => state.saves);
	// const obj = useSelector((state) => state.saves);
	// const chars = obj[1].index.results;
	let content = null;
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// const listo = saved.map((char, index) => {
	// 	return <h2 key={index}> {char.name}</h2>;
	// });

	async function fetchCharacter() {
		const res = await fetch(path);
		const json = await res.json();
		const homeworldres = await fetch(json.homeworld);
		const homeworldjson = await homeworldres.json();
		json.homeworld = homeworldjson;
		const filmsRes = await Promise.all(json.films.map((film) => fetch(film)));
		const filmsJSON = await Promise.all(filmsRes.map((res) => res.json()));
		json.films = filmsJSON;
		setData(json);
	}

	return (
		<div>
			<input
				type="number"
				placeholder="What ID character u want?"
				style={{
					width: 300,
					height: '2em',
					borderRadius: 20,
					border: '1px black solid',
					paddingLeft: 15,
				}}
				value={ids}
				onChange={(e) => setIds(e.target.value)}
			></input>
			<button
				onClick={(e) => {
					fetchCharacter(ids);
				}}
			>
				Go
			</button>
			{data ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h2>Name: {data.name}</h2>
					<h3>Height: {data.height}</h3>
					<h3>Hair Color: {data.hair_color}</h3>
					<h3>Eye Color: {data.eye_color}</h3>
					<h2>homeworld: {data.homeworld.name}</h2>
					<form onSubmit={handleSubmit}>
						<button
							onClick={(e) => {
								// dispatch(save(id.name));
								setSaved((saved) => [...saved, data]);
							}}
						>
							Save
						</button>
					</form>
				</div>
			) : (
				''
			)}
			{saved ? (
				<div>
					{saved.map((obj, index) => {
						console.log(obj);
						return (
							<div
								key={index}
								style={{
									border: '1px black solid',
									padding: 20,
									marginBottom: 50,
									backgroundColor: 'black',
									color: 'white',
								}}
							>
								<h1>{obj.name}</h1>
								<p>Height: {obj.height}</p>
								<p>Hair: {obj.hair_color}</p>
								<p>Eye Color: {obj.eye_color}</p>
								<h2> Homeworld </h2>
								Homeworld: {obj.homeworld.name}
								<p>climate: {obj.homeworld.climate}</p>
								<p>diameter: {obj.homeworld.diameter}</p>
								<p>gravity: {obj.homeworld.gravity}</p>
								<h2> Films </h2>
								{obj.films.map((films, index) => {
									return <p key={index}>{films.title}</p>;
								})}
							</div>
						);
					})}
				</div>
			) : (
				"doesn't exist"
			)}
		</div>
	);
}

export default StarWars;
