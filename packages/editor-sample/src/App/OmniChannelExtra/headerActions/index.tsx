import React, { useEffect, useState } from 'react';

import { Cancel } from '@mui/icons-material';
import { IconButton, Link, Tooltip } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';
import { getTemplate } from '../services/templateService';

import OmniChannelSave from './save';

export default function OmniChannelActions() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    if (id) {
      getTemplate(parseInt(id))
        .then((response) => {
          resetDocument(JSON.parse(response.data.json_body));
          setTemplate(response.data);
        })
        .catch((error) => {
          console.error(error);
          setTemplate(null);
        });
    }
  }, []);

  return (
    <>
      <Tooltip title="Cancel">
        <Link href={'http://localhost:3000/email-templates'}>
          <IconButton>
            <Cancel fontSize="small" />
          </IconButton>
        </Link>
      </Tooltip>
      <OmniChannelSave template={template} />
    </>
  );
}
