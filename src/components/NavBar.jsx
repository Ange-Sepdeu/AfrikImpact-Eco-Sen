import { AppBar, Drawer, IconButton, Toolbar, Tooltip, Zoom, tooltipClasses  } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Menu from "@mui/icons-material/Menu"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import logo from "../assets/logo.jpg"
import useWindow from '../utils/useWindow'
import { DrawerList } from '../utils/navlinks'
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import ChevronRight from "@mui/icons-material/ChevronRight"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { useDispatch } from 'react-redux'

export default function NavBar() {
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false)
    const windowDimension = useWindow()
    const [anchorEl, setAnchorEl] = useState(null);

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip placement={"bottom-start"} TransitionProps={{timeout: 600}} TransitionComponent={Zoom} {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#ffffff',
          color: '#388E3C',
          paddingTop: 16,
          width: 1000,
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          fontSize: 16,
          fontWeight: 600
        },
      }));

      const [openSecondDrawer, setOpenSecondDrawer] = useState(false)
      const [selectedNavItem, setSelectedNavItem] = useState(null)
      const toggleOpenDrawer = (selected) => {
          setSelectedNavItem(selected)
          setOpenSecondDrawer(true)
      }
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [menuAppears, setMenuAppears] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (windowDimension.width <= 1100)
        setMenuAppears(true)
        else
        setMenuAppears(false)
    }, [windowDimension])


  return (
    <>
    <AppBar position="fixed" className='py-6 bg-white' color="inherit">
        <Toolbar>
            <div className='w-2/12'>
                <img className='w-1/12 shadow-lg top-0 rounded-full absolute' src={logo} alt="Logo"/>
            </div>
            { !menuAppears ? 
            <div className='flex flex-row justify-between items-center w-10/12'>
            {
              [...DrawerList].map((item, index) => {
                    if (index>0)
                    return(
                        <HtmlTooltip
                        key={index}
                        title={
                          <>
                            {
                                item.dropdownList.map((elm, index) => (
                                    <div className='hover:border-l-2 hover:border-green-700 px-2 mb-3' key={index}>
                                    <Link 
                                    state={{selectedLink:elm, subLinks:item.dropdownList}}
                                    to={`/${item.navigate}`}>
                                        {elm.label}
                                    </Link>
                                    </div>
                                ))
                            }
                          </>
                        }
                        
                      >
                        <div 
                         key={index} className='text-md uppercase cursor-pointer hover:border-l-8 hover:border-green-700 border-l-2 text-green-700 font-bold px-4 border-green-700'>
                        <div>{item.name}</div>
                        <div>{item.icon}</div>
                    </div>
                      </HtmlTooltip>
                    )
                    })
            }
            <button onClick={() => navigate("/offres")} type="button" className='hover:bg-opacity-80 bg-red-700 text-white mr-5 cursor-pointer uppercase p-2 w-2/12 text-center font-semibold rounded-2xl'>Faire un don</button>
            <Tooltip title="Rechercher">
                <IconButton>
                <SearchOutlined className="bg-gray-700 text-white rounded-full font-bold p-2" fontSize='large' />
                </IconButton>
            </Tooltip>
            </div>
            :
            <div className='flex flex-row w-full justify-between items-center'>
            <button onClick={() => navigate("/offres")} type="button" className='hover:bg-opacity-80 w-6/12 m-auto bg-red-700 text-white cursor-pointer uppercase p-2 w-2/12 text-center font-semibold rounded-2xl'>Faire un don</button>
            <div className='w-6/12 text-right'>
            <IconButton
                onClick={() => setOpenDrawer(true)} 
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{mr:2}}>
                <Menu />
            </IconButton>
            <SearchOutlined className="bg-gray-700 text-white rounded-full  font-bold p-2" fontSize='large' />
            </div>
            </div>
            }
        </Toolbar>
    </AppBar>
    <Drawer
    PaperProps={{
        sx: {width: windowDimension.width <= 700 ? "75%" : "45%"}
    }} open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className='h-full bg-gray-900'>
        <div className='p-4 text-center border-b-2 border-white font-bold text-gray-400 uppercase'>Menu</div>
        {
            [...DrawerList]?.map((drawerItem, index)=>
            {
              if (drawerItem?.dropdownList.length > 0) {
                return (
                  <div onClick={() => toggleOpenDrawer(drawerItem)} key={index} className='cursor-pointer p-4 border-b-2 border-gray-200 text-gray-200 flex flex-row justify-between items-center'>
                          <div>{drawerItem.name}</div>
                          <ChevronRight />
                  </div>
                )
              }
              else {
                return (
                  <Link key={index} to={`${drawerItem.navigate.toLowerCase()}`}>
                      <div key={index} className='p-4 border-b-2 border-gray-200 text-gray-200'>
                          <div>{drawerItem.name}</div>
                          <div>{drawerItem.icon}</div> 
                       </div>
                  </Link>
                )
              }
            }
            )
        }
        </div>
    </Drawer>
    <Drawer
    PaperProps={{
      sx: {width: windowDimension.width <= 700 ? "75%" : "45%"}
  }}
     open={openSecondDrawer} 
     onClose={() => setOpenSecondDrawer(false)}>
      <div className='h-full bg-gray-900 text-white'>
      <div className='text-right text-white'>
          <IconButton onClick={() => setOpenSecondDrawer(false)}>
            <ChevronLeft fontSize='30' className='text-4xl text-white' />
          </IconButton>
      </div>
          <div className='text-center p-4 border-b-2 border-white'>{selectedNavItem?.name}</div>
          {
            selectedNavItem?.dropdownList.map((selected, index) => (
              <Link state={{selectedLink:selected, subLinks:selectedNavItem?.dropdownList}} to={`/${selectedNavItem?.navigate.toLowerCase()}`}>
                        <div 
                    key={index} className='text-md cursor-pointer border-b-2 p-4 border-white'>
                        <div>{selected.label}</div>
                    </div>
              </Link>
            ))
          }
      </div>
    </Drawer>
    </>
  )
}
