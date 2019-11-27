import { Component } from 'react';
import React from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      city: '',
      handle: '',
      question: '',
      answer: '',
      phoneNumber: '',
      wager: 1,
      selected: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderQuestion() {
    const { answer } = this.state;
    const questionThree = (
      <>
        <br></br>
        <label for='game1'>Place your bet:</label>
        <br></br>
        <select required onChange={this.onChange} value={answer} name='answer'>
          <option value=''>--Please choose an artist--</option>
          <option value='Fivio Foreign'>Fivio Foreign</option>
          <option value='Pop Smoke'>Pop Smoke</option>
        </select>
      </>
    );
    const questionOne = (
      <>
        <br></br>
        <label for='game1'>Place your bet:</label>
        <br></br>
        <select required onChange={this.onChange} value={answer} name='answer'>
          <option value=''>--Please choose an artist--</option>
          <option value='The Game'>The Game</option>
          <option value='Fabolous'>Fabolous</option>
        </select>
      </>
    );
    const questionTwo = (
      <>
        <br></br>
        <label for='game1'>Place your bet:</label>
        <br></br>
        <select required onChange={this.onChange} value={answer} name='answer'>
          <option value=''>--Yes or No--</option>
          <option value='Yes'>Yes</option>
          <option value='No'>No</option>
        </select>
      </>
    );
    switch (this.state.question) {
      case 1:
        return questionOne;
      case 2:
        return questionTwo;
      case 3:
        return questionThree;
      default:
        return '';
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/api/game',
      data: {
        question: this.state.question,
        email: this.state.email,
        answer: this.state.answer,
        name: this.state.name,
        city: this.state.city,
        phoneNumber: this.state.phoneNumber,
        handle: this.state.handle,
        wager: this.state.wager,
      },
    })
      .then((res) => {
        this.setState({ selected: 3 });
      })
      .catch((err) => {});
  }

  selectGame(e, game) {
    e.preventDefault();
    this.setState({ question: game, selected: 2 });
  }
  render() {
    const { name, email, city, handle, question, answer, phoneNumber, selected } = this.state;
    return (
      <div>
        <link href='/public/static/css/styles.css' rel='stylesheet' />

        <div className='row'>
          <a href='#' onClick={(e) => this.selectGame(e, 1)} className='card'>
            <h3>Game #1 &rarr;</h3>
            <p>The Game and Fab drop Nov.29th w/ 'Born 2 Rap and 'SS3'. Who will sell more in the first week?</p>
            <br />
          </a>
          {/* </div> */}
          {/* <div className="row"> */}
          <a href='#' onClick={(e) => this.selectGame(e, 2)} className='card'>
            <h3>Game #2 &rarr;</h3>
            <p>Larry June has dropped five projects in 2019. Will he close out 2019 with a 6th?</p>
            <br />
          </a>
          {/* </div> */}
          {/* // <div className="row"> */}
          <a href='#' onClick={(e) => this.selectGame(e, 3)} className='card'>
            <h3>Game #3 &rarr;</h3>
            <p>Who gonna have the next banger? Pop Smoke or Fivio Foreign</p>
            <br />
          </a>
        </div>

        {selected === 2 ? (
          <div className='row'>
            <div className='card'>
              <h3>Sign up</h3>
              <br></br>
              <form onSubmit={this.handleSubmit} lassName='rsvp-form'>
                <div className='rsvp-form'>
                  <label for='name'>Name: </label>
                  <br></br>
                  <input
                    placeholder='Name'
                    className='signup-input'
                    type='text'
                    value={name}
                    onChange={this.onChange}
                    name='name'
                    required
                  />
                </div>
                <br></br>
                <div className='rsvp-form'>
                  <label for='email'>Email address: </label>
                  <br></br>
                  <input
                    className='signup-input'
                    type='email'
                    value={email}
                    onChange={this.onChange}
                    name='email'
                    required
                  />
                </div>

                <br></br>
                <div className='rsvp-form'>
                  <label for='name'>Where you from?: </label>
                  <br></br>
                  <input
                    className='signup-input'
                    type='text'
                    value={city}
                    onChange={this.onChange}
                    name='city'
                    required
                  />
                </div>
                <br></br>
                <div className='rsvp-form'>
                  <label for='email'>IG or Twitter @: </label>
                  <br></br>
                  <input
                    className='signup-input'
                    type='text'
                    value={handle}
                    onChange={this.onChange}
                    name='handle'
                    id='handle'
                  />
                </div>
                <br></br>

                <div className='rsvp-form'>
                  <label for='email'>Select your wager:</label>
                  <br></br>
                  <label>
                    <input type='radio' onChange={this.onChange} value={1} name='wager' checked={true} />
                    $1
                  </label>
                  <input type='radio' onChange={this.onChange} value={5} name='wager' />
                  $5
                </div>
                <br></br>
                <div className='rsvp-form'>
                  <label for='number'>Phone number: </label>
                  <br></br>
                  <input
                    className='signup-input'
                    type='text'
                    value={phoneNumber}
                    onChange={this.onChange}
                    name='phoneNumber'
                    id='phoneNumber'
                  />
                </div>
                {/* <div className='rsvp-form'>
                  <label for='name'>Place your bet </label>
                  <br></br>
                  <select value={question} name='question' onChange={this.onChange}>
                    <option>Select a Game</option>
                    <option value={1}>Game #1</option>
                    <option value={2}>Game #2</option>
                    <option value={3}>Game #3</option>
                  </select> */}
                {this.renderQuestion()}
                {/* </div> */}
                <br></br>
                <br></br>
                <button className='btn btn--right btn--tickets'>Play</button>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}
        {selected === 3 ? (
          <div className='row'>
            Confirmation:
            <p>
              Your Submission been received and logged. The final entry date is Tuesday, December 3rd. Please note: your
              entry is not valid until we receive confirmation of your wager via Cash App. All pay outs will be
              dispersed through Cash App as well. Winnings can be used for future gameplay. For all issues please email
              payments@clouty.io. For all media inquiries please email breemz@clouty.io
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default SignUpForm;
