import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';
import { getTemplates } from '../services/templateService';

export default function EnterpriseTemplates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getTemplates()
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        //TODO handle error - return 403 page
      });
  }, []);

  const handleClick = (template) => () => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('id')) {
      url.searchParams.append('id', template.id);
    } else {
      url.searchParams.set('id', template.id);
    }

    resetDocument(JSON.parse(template.json_body));
  };

  return (
    <>
      {templates.map((template) => (
        <Button key={template.id} onClick={handleClick(template)}>{template.name}</Button>
      ))}
    </>
  );
}
