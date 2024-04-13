import React, {useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import _cv_de from "./data/cv_de.json";
import _cv_en from "./data/cv_en.json";
import {CV} from "./types/types";
import ListGroup from 'react-bootstrap/ListGroup';
import me from './data/me.jpg';
import {downloadCV, from, useLanguageLocation} from "./services/utis";

const cv_de: CV = _cv_de;
const cv_en: CV = _cv_en;

export interface Lang {
  lang: string;
  filename: string;
}

export const Language: { [key: string]: Lang } = {
  DE: {
    lang: 'Deutsch',
    filename: 'cv_sanfratello_de.pdf',
  },
  EN: {
    lang: 'English',
    filename: 'cv_sanfratello_en.pdf',
  },
}

function App() {
  const defaultLanguage = useLanguageLocation(Language.EN);
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(defaultLanguage);
  const cv = selectedLanguage === Language.EN ? cv_en : cv_de;

  return (
    <Container fluid>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Text>Marco Sanfratello</Navbar.Text>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={downloadCV(cv, me, selectedLanguage)}>Download CV</Nav.Link>
              <NavDropdown title={selectedLanguage.lang}>
                <NavDropdown.Item onClick={() => setSelectedLanguage(Language.DE)}>{Language.DE.lang}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedLanguage(Language.EN)}>{Language.EN.lang}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className={'main'}>
        <Row>
          <Col lg={3} md={12}>
            <div className={'avatar g-sticky-top'}>
              <img src={me} alt={'This is me'}/>
            </div>
          </Col>
          <Col lg={9} md={12}>
            <CVTabs cv={cv} key={selectedLanguage.lang}/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

function CVTabs({cv}: { cv: CV }) {
  return (
    <Tabs defaultActiveKey={cv.categories[0].title} fill className={'g-sticky-top bg-white'}>
      {cv.categories.map((category) => (
        <Tab key={from(category)} eventKey={category.title} title={category.title}>
          <ListGroup variant="flush">
            {category.entries.map((c) => {
              return (
                <ListGroup.Item key={from(c)}>
                  <Row>
                    <Col lg={2} md={3}>
                      <div className="fw-bold">{c.title}</div>
                    </Col>
                    <Col lg={10} md={9}>
                      {c.content.title && <div className="fw-bold">{c.content.title}</div>}
                      {c.content.__html.map(__html => <div key={__html} dangerouslySetInnerHTML={{__html}}/>)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Tab>
      ))}
    </Tabs>
  );
}

export default App;
