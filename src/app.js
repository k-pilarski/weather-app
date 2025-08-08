//app.js

import { weatherForm} from './elements.js'
import { getCity  } from './taskHandler.js';


async function init() {
    weatherForm.addEventListener('submit', getCity);
}

init();
