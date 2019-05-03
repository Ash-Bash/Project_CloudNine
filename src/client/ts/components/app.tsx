import * as React from "react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello, World!!</h1>;
    }
}