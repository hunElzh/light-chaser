import {combineReducers} from 'redux';

import layoutDesigner from './LayoutDesigner';

export default combineReducers({
    dataXDesigner: layoutDesigner,
})