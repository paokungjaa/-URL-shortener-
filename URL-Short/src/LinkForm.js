import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCodeCanvas } from "qrcode.react";

const LinkForm = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkHistory, setLinkHistory] = useState([]);


  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('linkHistory')) || [];
    setLinkHistory(savedLinks);
  }, []);


  useEffect(() => {
    localStorage.setItem('linkHistory', JSON.stringify(linkHistory));
  }, [linkHistory]);


  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
 }, [copied]);

  useEffect(() => {
    if (!inputValue) return;

    const existing = linkHistory.find(item => item.original === inputValue);
    if (existing) {
      setShortenLink(existing.short);
      return;
    }

    const fetchShortLink = async () => {
      try {
        setLoading(true);
        setError('');
        setShortenLink('');

        const res = await fetch('https://urlsmush.com/api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputValue }),
        });

        const data = await res.json();

        if (data.status === 'success') {
          const short = data.data.short_url;
          setShortenLink(short);

          const newLink = { original: inputValue, short };
          setLinkHistory([newLink, ...linkHistory]);
        } else {
          setError(data.message || 'Failed to shorten the URL.');
        }
      } catch (err) {
        setError('Something went wrong while shortening the link.');
      } finally {
        setLoading(false);
      }
    };

    fetchShortLink();
  }, [inputValue]);

 
  const clearHistory = () => {
    localStorage.removeItem('linkHistory');
    setLinkHistory([]);
  };

  return (
    <div className="result">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {shortenLink && !loading && (
        <>
          <div className="result-row">
            <p>{shortenLink}</p>
            <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
              <button className={copied ? 'copied' : ''}>
                {copied ? 'Copied' : 'Copy the link'}
              </button>
            </CopyToClipboard>
          </div>

          <div className="qr-container">
            <QRCodeCanvas value={shortenLink} size={150} bgColor="#ffffff" fgColor="#000000" />
          </div>
        </>
      )}

      {/* Link History */}
      {linkHistory.length > 0 && (
        <div className="history-container">
          <h3>Link History</h3>
          <button className="clear-btn" onClick={clearHistory}>Clear History</button>
          <ul className="history-list">
            {linkHistory.map((item, index) => (
              <li key={index}>
                <div className="history-item">
                  <span className="original">{item.original}</span>
                  <a href={item.short} target="_blank" rel="noopener noreferrer">{item.short}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LinkForm;
