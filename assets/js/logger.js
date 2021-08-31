export default function logger(reducer) {

    return (prevState, action, args) => {
        console.group(action);
        const nextState = reducer(prevState, action, args);
        console.log('Prev State : ', prevState);
        console.log('Action arguments:', action, args);
        console.log('Next State :', nextState);


        console.groupEnd();
        return nextState;
    }
}