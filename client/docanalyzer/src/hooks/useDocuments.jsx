import { useState } from 'react';
import { uploadFiles, askGemini } from '../services/api';

export const useDocuments = () => {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const processDocuments = async (files) => {
    try {
      setProcessing(true);
      setError(null);
      const { data } = await uploadFiles(files);
      setResults(data.resultados);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar documentos');
    } finally {
      setProcessing(false);
    }
  };

  const queryGemini = async (prompt, files = []) => {
    try {
      setProcessing(true);
      setError(null);
      const { data } = await askGemini(prompt, files);
      setResults([data]);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al consultar Gemini');
    } finally {
      setProcessing(false);
    }
  };

  return { processing, results, error, processDocuments, queryGemini };
};