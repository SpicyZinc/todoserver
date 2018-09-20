import React, { Component } from 'react';
import axios from 'axios';

class ToDo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			newTask: '' 
		};

		this.loadFromServer = this.loadFromServer.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleTaskChange = this.handleTaskChange.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
	}

	componentDidMount() {
		this.loadFromServer();
	}

	handleTaskChange(e) {
		this.setState({
			newTask: e.target.value
		});
	}

	toggleTask(e) {
		let id = e.target.value;
		let tasks = this.state.tasks;
		let taskToUpdate = tasks.find((task) => task.id == id);
		taskToUpdate.checked = e.target.checked;

		axios.post(`http://localhost:9898/todo/tasks/${taskToUpdate.id}/edit`, taskToUpdate)
			.then((res) => {
				let updatedTask = res.data;
				this.setState({
					tasks: this.state.tasks.map((task) => task.id == updatedTask.id ? updatedTask : task),
					newTask: ''
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	loadFromServer() {
		axios.get('http://localhost:9898/todo/tasks')
			.then(res => {
				this.setState((prevState) => ({
					tasks: prevState.tasks.concat(res.data)
				}));
			});
	}

	// POST request
	handleSubmit(e, task) {
		e.preventDefault();
		e.stopPropagation();

 		let newTask = {
 			label: task,
 			checked: false
 		};

		axios.post("http://localhost:9898/todo/tasks/create", newTask)
			.then((res) => {
				this.setState({
					tasks: [...this.state.tasks, res.data],
					newTask: ''
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		return (
			<div>
				<div id="add_part">
					<form>
						<label>
							Enter a task: 
							<input
								type="text"
								style={{ width: 140 }}
								placeholder='What do you have to do?'
								value={this.state.newTask}
								onChange={this.handleTaskChange}
							/>
						</label>
						<button onClick={(e) => this.handleSubmit(e, this.state.newTask)}>Add</button>
					</form>
				</div>

				<div id="tasks">
					<ul>
						{
							this.state.tasks && this.state.tasks.map((task, i) =>
								<li
									key={i}
									style={task.checked ? { textDecoration: 'line-through' } : {}}
								>
									<input
										type="checkbox"
										value={task.id}
										checked={task.checked}
										onChange={this.toggleTask}
									/>
									{task.label}
								</li>
							)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default ToDo;