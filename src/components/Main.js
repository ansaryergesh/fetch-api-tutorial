import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Loading} from './Loader';
import {fetchWords, postWords} from '../redux/actions/actionCreators';

const mapStateToProps = state => ({
    words: state.words || [],
});

const mapDispacthToProps = dispatch => ({
    fetchWords: () => { dispatch(fetchWords()); },
    postWords: (text1, text2) => dispatch(postWords(text1, text2)),
});

class Main extends Component {
    componentDidMount() {
      this.props.fetchWords();
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postWords(values.text1, values.text2);
    }

    render() {
        if(this.props.words.words.isLoading) {
            return(
                <Loading />
            )
        }
        if(this.props.words.words.errMess) {
            return (
                <div>
                    <p>{this.props.words.words.errMess}</p>
                </div>
            )
        }
        return (
            <div>
                {this.props.words.words.map(word=>(
                    <div>
                        <p>{word.text1}<span> {word.text2}</span></p>
                    </div>
                ))}
                <form onSubmit={(values) => this.handleSubmit(values)}>
                    <label htmlFor="text1">Text1: </label>
                    <input model='.text1' type="text" id="text1" name="text1"  />
                    <label htmlFor="text2">Text2: </label>
                    <input type="text" model='.text2' id="text2" name="text2" />
                    <input type="submit" value="Submit" />
                </form> 
            </div>
        )
    }
}

export default (connect(mapStateToProps, mapDispacthToProps)(Main));