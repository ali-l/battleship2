import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import "babel-polyfill";

import * as Game from "./Game";

document.addEventListener("DOMContentLoaded", () => {
  let elements = document.querySelectorAll('[data-react-class]');
  for(var i = 0; i < elements.length; i++) {
    let klass = elements[i].getAttribute('data-react-class');
    let props = JSON.parse(elements[i].getAttribute('data-react-props'));
    let reactElement = React.createElement(eval(klass).default, props);
    ReactDOM.render(reactElement, elements[i]);
  }
});
