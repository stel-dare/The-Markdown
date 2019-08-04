import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import marked from 'marked';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      input:'## hello',
      mobile:true
    };
    this.toggleViewMobile=this.toggleViewMobile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.expandToRight = this.expandToRight.bind(this);
    this.expandToLeft = this.expandToLeft.bind(this);

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
}

componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
}

  toggleViewMobile(){
    document.getElementById('editorDiv').classList.toggle('hidden');
    document.getElementById('previewDiv').classList.toggle('hidden');
  }

  handleChange(event){
  this.setState({
    input:event.target.value
  });
  }

  updateWindowDimensions(){
  let browserView = Math.max(
  document.body.scrollWidth,
  document.documentElement.scrollWidth,
  document.body.offsetWidth,
  document.documentElement.offsetWidth,
  document.documentElement.clientWidth
);
browserView >=765? this.setState({mobile:false}) : this.setState({mobile:true});
console.log(this.state.mobile);
console.log(browserView);
  }

  expandToRight(){
  document.getElementById('previewDiv').classList.toggle('hide');
  document.getElementById('editorDiv').classList.toggle('backToNormal');
  document.getElementById('editorDiv').classList.toggle('expandToRight');
  }

  expandToLeft(){
  document.getElementById('editorDiv').classList.toggle('hide');
  document.getElementById('previewDiv').classList.toggle('backToNormal');
  document.getElementById('previewDiv').classList.toggle('expandToRight');
  }


  render() {
    return (
      <React.Fragment>
      <h1 className='title'>The Markdown</h1>
      <Editor toggle={this.toggleViewMobile} stateValue={this.state.input} handleChange={this.handleChange} mobile={this.state.mobile} expand={this.expandToRight}/>
      <Preview toggle={this.toggleViewMobile} stateValue={this.state.input} mobile={this.state.mobile} expand={this.expandToLeft}/>
      <p className='credit'>Made by <a href='https://stel-dare.github.io' rel='noopener noreferrer' target='_blank'>Stel</a> with love.</p>
      </React.Fragment>
    );
  }
};

const Editor = ({toggle,stateValue,handleChange, mobile, expand})=>{
  return(
    <div className='editorDiv backToNormal' id='editorDiv'>
    <p className='editorP'>Editor { mobile? <i className="far fa-eye" onClick={toggle}></i> : <i className="fas fa-expand-arrows-alt" onClick={expand}></i>}</p>
    <textarea  className='editorText'  onChange={handleChange} value={stateValue}/>
    </div>
  );
}

const Preview = ({toggle,stateValue, mobile , expand})=>{
//  let test = marked(stateValue);
  return(
    <div className='previewDiv hidden backToNormal' id='previewDiv'>
    <p className='previewP'>Preview {mobile? <i className="far fa-eye-slash" onClick={toggle}></i> : <i className="fas fa-expand-arrows-alt" onClick={expand}></i>}</p>
    <div  className='previewText' id='previewText'  dangerouslySetInnerHTML={{ '__html': marked(stateValue)}}></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
