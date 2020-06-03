import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Loading} from './Loader';
import {fetchWords} from '../redux/actions/actionCreators';

const mapStateToProps = state => ({
    words: state.words || [],
});

const mapDispacthToProps = dispatch => ({
    fetchWords: () => { dispatch(fetchWords()); },
});

class Main extends Component {
    componentDidMount() {
      this.props.fetchWords();
    }

    constructor(props) {
        super(props);
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
                    <h4>{this.props.words.words.errMess}</h4>
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
            </div>
        )
    }
}

export default (connect(mapStateToProps, mapDispacthToProps)(Main));