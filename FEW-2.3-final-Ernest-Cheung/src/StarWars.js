import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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
				style={{ width: 300 }}
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
				<div>
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
				"doesn't exist"
			)}
			{saved ? (
				<div>
					{saved.map((obj, index) => {
						console.log(obj);
						return (
							<div key={index}>
								Name: {obj.name}
								Height: {obj.height}
								Hair: {obj.hair_color}
								Eye Color: {obj.eye_color}
								<h2> Homeworld </h2>
								Homeworld: {obj.homeworld.name}
								climate: {obj.homeworld.climate}
								diameter: {obj.homeworld.diameter}
								gravity: {obj.homeworld.gravity}
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
