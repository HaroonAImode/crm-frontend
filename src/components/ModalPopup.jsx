import React from 'react';

const ModalPopup = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.18)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{backdropFilter:'blur(4px)', background:'#fff', borderRadius:12, padding:32, minWidth:340, maxWidth:600, boxShadow:'0 8px 32px rgba(0,0,0,0.18)', position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute', top:12, right:16, fontSize:18, background:'none', border:'none', cursor:'pointer'}}>×</button>
        {children}
      </div>
    </div>
  );
};

export default ModalPopup;
