import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Container, Row, Col, Image, Form, Button, Card } from 'react-bootstrap'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
    <tbody>
      {anecdotes.map(anecdote =>
        <tr key={anecdote.id}>
        <td>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </td>
        </tr>
      )}
      </tbody>
      </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <Card>
    <Card.Body>
    <blockquote className="blockquote mb-0">
      <h2>{' '}{anecdote.content}{' '}</h2>
      <div>has {anecdote.votes} votes</div>
     <footer className="blockquote-footer">
          Author: {anecdote.author}
      <div>for more info see <a href={"http://" + anecdote.info}>{anecdote.info}</a></div>
     </footer> 
    </blockquote>
   </Card.Body>
  </Card>
  )
}

const About = () => (
  <Container>
    <Row>
    <Col><h2>About anecdote app</h2></Col>
    </Row>

  <Row>
    <Col><p>According to Wikipedia:</p></Col>
    <Col sm={8}><em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em> 
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Alan_Turing_az_1930-as_%C3%A9vekben.jpg/200px-Alan_Turing_az_1930-as_%C3%A9vekben.jpg" fluid />
    </Col>
    </Row>
    <Row>
   
  </Row>
  </Container>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)


class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.Notify('Added anecdote ' + this.state.content)
    console.log(this.state.notification)
    this.props.history.push('/')


  }



  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
        
         <Form.Group controlId="formGroupContent">
         <Form.Label> Content: &nbsp;</Form.Label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Group>
         
          <Form.Group controlId="formGroupAuthor">
          <Form.Label>  Author: &nbsp; </Form.Label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Group>
          
          <Form.Group controlId="formGroupUrl">
          <Form.Label> Url for more info: &nbsp; </Form.Label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Group>

          <Button variant="primary" size="lg" type="submit">
            Create
          </Button>
        </Form>
      </div>
    )

  }
}


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 'home'
    }




    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }



  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    console.log(this.state.notification)
  }

  Notify = (viesti) => {

    this.setState({ notification: viesti })
    setTimeout(() => { this.setState({ notification: '' }) }, 6000)

  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
    console.log(anecdotes)
  }




  render() {

     const navbarStyle = {
      background: "lightblue"
     }

     const navStyle = {
        fontWeight: "bold",
        color: "red",
        margin: '2px',
        padding: '2px'
     }

    const hideWhenVisible = {
      display: this.state.notification ? '' : 'none',
      border: 'solid',
      padding: '5px',
      background: "lightgreen",
      margin: '10px',
      borderRadius: '10px'
    }

    return (
      <div className="container">
        <h1>Software anecdotes</h1>

        <Router>
          <div>
            <div style={navbarStyle}>
              <NavLink exact to="/" activeStyle={navStyle}>Anecdotes</NavLink> &nbsp;
              <NavLink exact to='/about' activeStyle={navStyle}>About</NavLink> &nbsp;
              <NavLink exact to="/create" activeStyle={navStyle}>Create new</NavLink>
            </div>

            <div style={hideWhenVisible}>
              {this.state.notification}
            </div>

            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew.bind(this)} Notify={this.Notify} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>

        </Router>

      </div>
    )


  
  }
}

export default App;
