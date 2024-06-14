import MenuProjectItems from "@/components/menuProjectItems";
import Image from "next/image";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from './styles.module.scss'
import Logo from '@/assets/logo.svg'
import Bar from '@/assets/icons/bar.svg'
import AddProject from '@/assets/icons/add-project-orange.svg'
import AddFolder from '@/assets/icons/add-folder-orange.svg'
import { IMobileNavbarProps } from "./props";

export default function MobileNavbar(props: IMobileNavbarProps) {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.container}>
        <Navbar.Brand href="#home"><Image src={Logo} alt="Bosque" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggle}>
          <button
            className={styles.buttonMenu}
          >
            <Image src={Bar} alt="Menu" />
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className={styles.navContent}>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={props.showNewFolder}><Image src={AddFolder} alt="Adicionar pasta" /></button>
            <button className={styles.actionButton} onClick={props.showNewProject}><Image src={AddProject} alt="Adicionar projeto" /></button>
          </div>
          <Nav className="me-auto">
            <MenuProjectItems itemsToRender={props.itemsToRender}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}