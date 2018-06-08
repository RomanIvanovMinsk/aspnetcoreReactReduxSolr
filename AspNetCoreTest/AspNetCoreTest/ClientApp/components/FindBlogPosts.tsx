// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

import * as SuggestionsStore from '../store/Suggestion';
import { BlogPost } from '../store/Blog';
import Suggestion = SuggestionsStore.Suggestion;

interface FindBlogProps {
    FindedSuggestion?: Suggestion[];
    FindSuggestions: Function;
}


class FindBlog extends React.Component<FindBlogProps, {}> {
    public render() {
        var style = {
            margin: 20
        }
        return this.props.FindedSuggestion && this.props.FindedSuggestion.length > 0
            ? <div className="container-fluid" style={style}>
                <input type="text" onChange={this.props.FindSuggestions.bind(this)} />
                <div className="row">
                    {
                        this.props.FindedSuggestion.map(suggestion =>
                           <div>{suggestion.text}</div>
                        )
                    }
                </div>              
            </div>
            : <div></div>;
    }
}

export default FindBlog