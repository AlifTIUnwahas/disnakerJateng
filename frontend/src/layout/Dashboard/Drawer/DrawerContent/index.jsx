// project imports
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const styles = {
     headerLogos: { 
      display: "flex", 
      gap: "20px", 
      marginBottom: "30px",
      justifyContent: "center",
      alignItems: "center"
    },
  };
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
        {drawerOpen && <NavCard />}
      </SimpleBar>
      <div style={styles.headerLogos}>
            <img src="/img/ayoKerjo.png" alt="Ayo Kerjo" style={{ height: "60px" }} />
            <img src="/img/ngopeniNglakoni.png" alt="Slogan" style={{ height: "60px" }} />
      </div>
    </>
  );
}
