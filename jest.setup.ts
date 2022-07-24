import 'whatwg-fetch';
import '@testing-library/react'


require('dotenv').config({
    path:'.env.test'
});
//                    I
// jest.mock('./ src/helpers/getEnvironments',
//    getEnvironments:()=>({... process.env})
// });