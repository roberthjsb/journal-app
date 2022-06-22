import {createTheme} from '@mui/material'
import { red } from '@mui/material/colors'


export const pupleTheme = createTheme({
palette:{
    primary:{
        main:'#262254',
    },
    secondary:{
        main:'#543884'
    },
    error:{
        main:red[400]
    }
}
})