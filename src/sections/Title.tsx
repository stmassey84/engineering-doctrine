import React from 'react';

const Title: React.FC<{title:string}> = (props) => {
  return <h3 className={'mt-16'}>{props.title}</h3>
};

export default Title;