import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import FooterComponent from '../../components/FooterComponent'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export default function AttendeePage() {
    return (
        <>
            <NavbarComponent />
            <Box sx={{marginTop:10}}>

            <Outlet  />
            </Box>
            <FooterComponent />
        </>
    )
}
