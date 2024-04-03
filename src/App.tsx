import React, {useState} from 'react';
import './App.css';
import {MyDocument} from "./MyDocument";
import {pdf} from '@react-pdf/renderer';
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
import {Category, CV} from "./types/types";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import me from './data/me_orig.jpg';

const cv_de: CV = _cv_de;
const cv_en: CV = _cv_en;

export interface Lang {
  lang: string;
  fileName: string;
}

export const Language: { [key: string]: Lang } = {
  DE: {
    lang: 'Deutsch',
    fileName: 'cv_sanfratello_de.pdf',
  },
  EN: {
    lang: 'English',
    fileName: 'cv_sanfratello_en.pdf',
  },
}

function downloadCV(selectedLanguage: Lang) {
  return () => {
    pdf(<MyDocument lang={selectedLanguage}/>)
      .toBlob()
      .then(blob => {
        console.log('blob');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedLanguage.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(Language.EN);
  const cv = selectedLanguage === Language.EN ? cv_en : cv_de;
  return (
    <Container fluid>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Text>Marco Sanfratello</Navbar.Text>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={downloadCV(selectedLanguage)}>Download CV</Nav.Link>
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
          <Col lg={4} md={12}>
            <div className={'avatar sticky-top'}>
              <img src={me} alt={'profile picture'}/>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <Tabs defaultActiveKey={cv.categories[0].title} fill className={'sticky-top bg-white'}>
              {cv.categories.map((c) => (
                <Tab key={c.title} eventKey={c.title} title={c.title}>
                  <Content category={c}/>
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}


interface Props {
  category: Category;
}

function Content(props: Props) {
  return (
    <ListGroup variant="flush">
      {props.category.entries.map((c) => {
        return (
          <ListGroup.Item key={c.title}>
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
  );
}

function Content1(props: Props) {
  return (
    <>
      {props.category.entries.map((c) => {
        return (
          <Row key={c.title}>
            <Col md={2}>{c.title}</Col>
            <Col md={10}>
              {c.content.title && <div className={'fw-bold'}>{c.content.title}</div>}
              {c.content.__html.map(__html => <div key={__html} dangerouslySetInnerHTML={{__html}}/>)}
            </Col>
          </Row>
        );
      })}
    </>
  );
}

export default App;
