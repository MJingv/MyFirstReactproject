import React from 'react';
import PCHeader from './pcHeader';
import PCFooter from './pcFooter';
import PCNewsContainer from './pcNewsContainer';


export default class PCIndex extends React.Component{
  constructor() {
    super();
  };

  render(){
    return (
      <div>
        <PCHeader></PCHeader>
        <PCNewsContainer></PCNewsContainer>
        <PCFooter></PCFooter>
      </div>

    );
  };
}
