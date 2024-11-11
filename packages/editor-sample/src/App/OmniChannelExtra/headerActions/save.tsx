import React, { useMemo, useState } from 'react';

import { CloseOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, IconButton, Input, Modal, Tooltip, Typography } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument } from '../../../documents/editor/EditorContext';
import { storeTemplate, updateTemplate } from '../services/templateService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OmniChannelSave() {
  const [templateName, setTemplateName] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const document = useDocument();
  const htmlDoc = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);

  const save = () => {
    if (templateName) {
      const url = new URL(window.location.href);
      const id = url.searchParams.get('id');

      id ? update(parseInt(id)) : store();
    }
  };

  const store = () => {
    storeTemplate(templateName, JSON.stringify(document), htmlDoc)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const update = (id: number) => {
    updateTemplate(id, templateName, 3, JSON.stringify(document), htmlDoc)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Tooltip title="Save">
        <IconButton onClick={handleOpen}>
          <SaveOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Save Email Template
          </Typography>
          <Input
            placeholder="Template Name"
            sx={{ mt: 4 }}
            autoFocus
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <Tooltip title="Save">
            <IconButton onClick={save}>
              <SaveOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Cancel'}>
            <IconButton onClick={handleClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Modal>
    </>
  );
}
