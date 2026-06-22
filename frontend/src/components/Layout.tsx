import type { ReactNode } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: <DashboardIcon />, end: true },
  { to: '/tccs', label: 'TCCs', icon: <ArticleIcon /> },
  { to: '/alunos', label: 'Alunos', icon: <SchoolIcon /> },
  { to: '/professores', label: 'Professores', icon: <PersonIcon /> },
  { to: '/cursos', label: 'Cursos', icon: <MenuBookIcon /> },
  { to: '/departamentos', label: 'Departamentos', icon: <BusinessIcon /> },
  { to: '/unidades', label: 'Unidades Acadêmicas', icon: <ApartmentIcon /> },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <ArticleIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" noWrap component="div">
            Gestão de TCCs
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.end}
                sx={{
                  '&.active': {
                    bgcolor: 'action.selected',
                    borderRight: 3,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
