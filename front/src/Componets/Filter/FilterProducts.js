import React, { Component } from 'react';
import AuthServices from '../../Services/Services'
import './Filter.css';

import ScrollMenu from 'react-horizontal-scrolling-menu';

const list = [
    { name: 'All' },
    { name: 'Fashion' },
    { name: 'Sports' },
    { name: 'Motor' },
    { name: 'Books' },
    { name: 'Tools' },
    { name: 'Home' },
    { name: 'Other' },
  ];
   
  // One item component
  // selected prop will be passed
  const MenuItem = ({text, selected}) => {
    return <div
      className={`menu-item ${selected ? 'active' : ''}`}
      >{text}
      </div>;
  };
   
  // All items component
  // Important! add unique key
  export const Menu = (list, selected) =>
    list.map(el => {
      const {name} = el;
   
      return <MenuItem text={name} key={name} selected={selected} />;
    });
   
   
  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
   
   
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
   
  const selected = 'All';

export default class FilterProducts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            filterCategory: "All",
            
        }
        this.menuItems = Menu(list, selected);
        this.service = new AuthServices();
    }

    state = {
        selected
      };
     
      onSelect = (value) => {
        this.setState({filterCategory: value})
        this.props.filterProducts(value)
      }
   

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({filterCategory: value})
        this.props.filterProducts(value)
    };

 

    handleClick = () => {
        const { category } = this.props.match;
       this.service.getProductCategory(category)
    };

render(){
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;
 
    return (
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}




