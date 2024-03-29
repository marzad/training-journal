import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import useUserApiCall from "../hooks/UseUserApiCall";
import {green} from "@mui/material/colors";
import AssignmentIcon from '@mui/icons-material/Assignment';
import logo from "../images/trainingjournal_free-file.png"
import { Fragment } from 'react';

type AccountMenuProps ={
    username: string
}

export default function AccountMenu(props: AccountMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {logout} = useUserApiCall()

    const navigate = useNavigate()

    const submitLink = () => {
        if(props.username === ""){
            return(
                <Button onClick={() => navigate("/login")}>Account</Button>
            )
        }else{
            return(
                <Button onClick={() => navigate("/menu")}>Account</Button>
            )
        }
    }

    return (
        <Fragment>
            <Box sx={{ display: 'flex', margin: 2}}>
                <img src={logo} alt={"trainingjournal-icon"} width={"40%"}/>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ bgcolor: green[500], width: 30, height: 30}} variant="rounded"><AssignmentIcon /></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> {submitLink()}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <Button onClick={() => navigate("/signup")}>Neues Profil anlegen</Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <Button onClick={() => navigate("/settings")}>Persönliche Daten</Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <Button onClick={logout}>Ausloggen</Button>
                </MenuItem>
            </Menu>
        </Fragment>
    );
}