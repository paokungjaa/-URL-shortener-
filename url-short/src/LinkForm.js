import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const LinkForm = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Timer for Copy
  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  // Fetch shortened link when inputValue changes
  useEffect(() => {
    if (!inputValue) return;

    const fetchShortLink = async () => {
      try {
        setLoading(true);
        setError('');
        setShortenLink('');

        const res = await fetch('https://urlsmush.com/api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputValue })
        });

        const data = await res.json();

        if (data.status === 'success') {
          setShortenLink(data.data.short_url); 
        } else {
          setError(data.message || 'Failed to shorten the URL.');
        }
      } catch (err) {
        setError('Something went wrong with the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchShortLink();
  }, [inputValue]);

  return (
    <div className="result">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {shortenLink && !loading && (
        <>
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? 'copied' : ''}>
              {copied ? 'Copied!' : 'Copy the link'}
            </button>
          </CopyToClipboard>
        </>
      )}
    </div>
  );
};

export default LinkForm;
