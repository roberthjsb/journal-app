import { ThemeProvider } from "@emotion/react";
import {CssBaseline} from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { pupleTheme } from "./purpleTheme";

export const AppTheme:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ThemeProvider theme={pupleTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
