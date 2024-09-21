import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { fetchUser } from "../Auth";
import './Profile.css'
import {ReactComponent as Exit} from './exit.svg';
import {ReactComponent as Show} from './show.svg';
import axios from "axios";

export default function Profile() {
	const navigate = useNavigate();
	const [isClikedF, setClickedF] = useState(false);
	const [isClikedS, setClickedS] = useState(false);

	const [notes, setNotes] = useState([])
	const [isLoadingNotes, setLoadingNotes] = useState(false);

	const [todos, setTodos] = useState([])
	const [isLoadingTodos, setLoadingTodos] = useState(false);

	const [noteDescription, setnoteDescription] = useState(false);


	const [abs, setABS] = useState(false);
	const [ind, setind] = useState(0);
	const [kkb, setkkb] = useState(0);

	const getNotes = () => {
		axios.get('http://127.0.0.1:8000/notes/get', {
			params: {
				'username': fetchUser()['username']
			},
			headers: {
				'accept': 'application/json'
			}
		})
		.then(function (response) {
			if (response.data.status !== 'ok'){
				alert(response.data.message)
			}
			console.log(response.data);
			setNotes(response.data.notes)
		})
		.catch(function (error) {
			console.log(error, "error");
		});
	}

	if (isLoadingNotes == false){
		getNotes();
		setLoadingNotes(true);
	}


	const getTodos = () => {
		axios.get('http://127.0.0.1:8000/todos/get', {
			params: {
				'username': fetchUser()['username']
			},
			headers: {
				'accept': 'application/json'
			}
		})
		.then(function (response) {
			if (response.data.status !== 'ok'){
				alert(response.data.message)
			}
			console.log(response.data);
			setTodos(response.data.todos)
		})
		.catch(function (error) {
			console.log(error, "error");
		});
	}

	const addNote = () => {
		axios.get('http://127.0.0.1:8000/notes/add', {
			params: {
				'username': fetchUser()['username'],
				'note_title': noteDescription,
				'note_description': 'text'
			},
			headers: {
				'accept': 'application/json'
			}
		})
		.then(function (response) {
			if (response.data.status !== 'ok'){
				alert(response.data.message)
			}
			alert('Заметка сохранена')
			getNotes()
		})
		.catch(function (error) {
			console.log(error, "error");
		});
	}

	if (isLoadingTodos == false){
		getTodos();
		setLoadingTodos(true);
	}

	const saveNote = (index) => {
		console.log(kkb);
		axios.get('http://127.0.0.1:8000/notes/save', {
			params: {
				'id': kkb,
				'note_title': noteDescription,
			},
			headers: {
				'accept': 'application/json'
			}
		})
		.then(function (response) {
			if (response.data.status !== 'ok'){
				alert(response.data.message)
			}
			alert('Заметка обновлена')
			getNotes()
		})
		.catch(function (error) {
			console.log(error, "error");
		});
	}

	const newNote = () => {
		setABS(false);
		setnoteDescription('');
	}


	const signOut = () => {
		localStorage.removeItem("temitope");
		navigate("/");
	};

	const showNote = (index, ind2) => {
		setnoteDescription(notes[index].title);
		setind(index);
		setkkb(ind2);
		setABS(true);
	}

	return (
		<div className='Profile'>
			<div className='navigation'>
				<div className='topInfo'>
					<p className='display-6 wtext text-bold'>Library</p>
					<div className='d-flex'>
						<p className='username wtext fs-4' wtext>{fetchUser()['username']}</p>
						<Exit onClick={signOut} title='exit'/>
					</div>
				</div>

				<div className='notes'>
					<div className='left-t-n' onClick={(e) => setClickedF(!isClikedF)}>
						<Show className={isClikedF ? 'click show' : 'show'}/>
						<p className='fs-3 wtext text-bold'>Notes</p>
					</div>
					
					<p className='wtext fs-2 mr-3' role='button' onClick={(e) => (newNote())}>+</p>
				</div>

				<div className={isClikedF ? 'close content_notes' : 'content_notes'}>
					{notes.map((note, index) => (
						<div className='box' onClick={(e) => (
							showNote(index, note.id)
						)}>
							<p className='wtext fs-3'>{note.title}</p>
						</div>
					))}
				</div>

				<div className='todo'>
					<div className='left-t-todo' onClick={(e) => setClickedS(!isClikedS)}>
						<Show className={isClikedS ? 'click show' : 'show'}/>
						<p className='fs-3 wtext text-bold'>ToDO</p>
					</div>
					
					<p className='wtext fs-2 mr-3' role='button'>+</p>
				</div>

				<div className={isClikedS ? 'close content_todo' : 'content_todo'}>
					{todos.map((todo, index) => (
						<div className='box' key={index}>
							<p className='wtext fs-3'>{todo.title}</p>
						</div>
					))}
				</div>
			</div>

			<div className='SVO'>
				<div className={abs ? 'd-none zametka_new' : 'zametka_new'}>
					<input className='but' type='button' value='Save' onClick={(e) => addNote()}/>
					<textarea type='text' className='fs-3 w-100 h-100 gg' placeholder='Write text...' onChange={(e) => (setnoteDescription(e.target.value))}/>
				</div>
				<div className={!abs ? 'd-none zametka_old' : 'zametka_old'}>
					<input className='but' type='button' value='Save' onClick={(e) => saveNote(kkb)}/>
					<textarea value={noteDescription} type='text' className='fs-3 w-100 h-100 gg' placeholder='Write text...' onChange={(e) => (setnoteDescription(e.target.value))}/>
				</div>		
			</div>
		</div>
	);
}