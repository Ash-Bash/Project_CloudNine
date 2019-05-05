//// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import soundCloud from "soundcloud";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class App extends React.Component {


    startSoundCloud() {
    }

    render() {

        this.startSoundCloud();
        return <div>
            <h1>Hello, World!!</h1>
        </div>;
    }
}