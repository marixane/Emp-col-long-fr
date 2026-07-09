import { useEffect } from 'react';
import Tab from './Tab.jsx';

const subjectStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px 10px',
  textAlign: 'center',
  overflow: 'hidden'
};

const sessionStyle = {
  display: 'grid',
  gridTemplateColumns: '110px 1fr',
  alignItems: 'center',
  gap: '6px',
  minHeight: '24px',
  padding: '4px 7px',
  border: '1px solid rgba(124, 58, 237, 0.25)',
  borderRadius: '8px',
  background: 'rgba(139, 92, 246, 0.08)',
  color: '#5b21b6',
  fontFamily: 'Arial, sans-serif',
  lineHeight: 1,
  overflow: 'hidden'
};

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100px',
  height: '22px',
  borderRadius: '999px',
  background: '#8b5cf6',
  color: 'white',
  fontSize: '12px',
  fontWeight: 900,
  whiteSpace: 'nowrap'
};

const eventStyle = {
  color: '#5b21b6',
  fontSize: '21px',
  fontWeight: 900,
  lineHeight: 1.25,
  letterSpacing: '0.2px',
  textAlign: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(90deg, rgba(221,214,254,0.72), rgba(237,233,254,0.95))',
  border: '1px solid rgba(124,58,237,0.35)',
  borderRadius: '12px',
  margin: '8px 18px',
  padding: '10px 16px',
  overflow: 'hidden'
};

const headerStyle = {
  position: 'absolute',
  top: '10px',
  left: '50px',
  right: '18px',
  height: '42px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '18px',
  borderRadius: '12px',
  background: '#ddd6fe',
  color: '#111827',
  padding: '0 18px',
  boxShadow: '0 2px 6px rgba(17, 17, 17, 0.12)'
};

function SignatureRow() {
  return <section className="homework-entry cahier-extra-holiday-entry forced-signature-row" style={{ '--homework-color': '#8b5cf6' }}>
    <div className="homework-date">SAMEDI 10/07/2027</div>
    <div className="homework-content">
      <div className="homework-subject" style={subjectStyle}>
        <div style={sessionStyle}>
          <span style={badgeStyle}>Administration</span>
          <span />
        </div>
      </div>
      <div className="homework-text" style={eventStyle}>Signature procès-verbal</div>
    </div>
  </section>;
}

function EmptyRow({ index }) {
  return <section className="homework-entry forced-empty-row" aria-hidden="true" key={index}>
    <div className="homework-date" />
    <div className="homework-content">
      <div className="homework-subject" />
      <div className="homework-text" />
    </div>
  </section>;
}

function SignaturePage() {
  return <main className="cahier-shell clean-cahier-shell forced-signature-shell">
    <section className="cahier-preview-zone">
      <div className="a4-page cahier-page homework-page forced-signature-page" style={{ position: 'relative', paddingTop: '60px', '--group-color': '#ddd6fe' }}>
        <div style={headerStyle}>
          <strong style={{ fontSize: '20px', textTransform: 'uppercase' }}>Clôture administrative</strong>
          <strong style={{ color: '#5b21b6', fontSize: '14px' }}>10/07/2027</strong>
        </div>
        <SignatureRow />
        {[1, 2, 3, 4].map((index) => <EmptyRow key={index} index={index} />)}
      </div>
    </section>
  </main>;
}

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    return () => {
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <>
    <Tab />
    <SignaturePage />
  </>;
}