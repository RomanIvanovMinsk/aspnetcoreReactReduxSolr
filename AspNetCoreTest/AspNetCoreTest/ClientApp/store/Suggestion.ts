// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import { Action, Reducer, ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SuggestionsState {
    FindedSuggestion: Suggestion[];
    Search: string;
}


export interface Suggestion {
    id: number;
    text: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface FindSuggestions { type: 'GET_SUGGESTIONS'; suggestions: Suggestion[]; search: string }



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = FindSuggestions;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    FindSuggestions: (search: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
       
        let fetchTask = fetch(`api/Suggestions/search=${search.target.value}`)
                .then(response => response.json() as Promise<Suggestion[]>)
                .then(data => {
                    dispatch({ type: 'GET_SUGGESTIONS', suggestions: data, search: search.target.value });
                });

            //we have to understand what the task is - and how we can use it
            //addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            //dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer: Reducer<any> = (state: any = { FindedSuggestion: [], Search: ""}, action: KnownAction | any) => {
    switch (action.type) {
        case 'GET_SUGGESTIONS':
            {
                return <SuggestionsState>{
                    FindedSuggestion: action.suggestions,
                    Search: action.search
                }
            };
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || <SuggestionsState>{FindedSuggestion: [], Search: ""};
};

