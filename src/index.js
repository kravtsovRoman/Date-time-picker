import React from 'react';
import {render} from 'react-dom';
import Datetime from './datetime';

render(<Datetime onSave={ (val) => console.log(val) } />, document.querySelector('#app'));

