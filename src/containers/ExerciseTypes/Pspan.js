import React from 'react'
import ContentEditable from 'react-contenteditable'

// Build with react-contenteditable 
// https://github.com/lovasoa/react-contenteditable
// https://www.npmjs.com/package/react-contenteditable


class Pspan extends React.Component {
    constructor(props) {
      super(props)
      this.contentEditable = React.createRef();
      this.state = {html: this.props.content};
    };

    strip = html => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
   
    handleChange = evt => {
        this.setState({html: this.strip(evt.target.value)});
    };
   
    render = () => {
      return <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName='span' // Use a custom HTML tag (uses a div by default)
              />
    };
};

export default Pspan;
