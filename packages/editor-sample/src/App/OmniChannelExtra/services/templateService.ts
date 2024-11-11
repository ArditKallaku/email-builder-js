import apiClient from './apiClient';

//store new template
export const storeTemplate = async (name : string, json_body : string, html_body : string) => {
  const response = await apiClient.post('/email/template', {
    name : name,
    json_body : json_body,
    html_body : html_body,
  });
  return response.data;
};

//get all templates
export const getTemplates = async () => {
  const response = await apiClient.get('/email/template');
  return response.data;
};

//get template by id
export const getTemplate = async (id: number) => {
  const response = await apiClient.get(`/email/template/${id}`);
  return response.data;
};

//delete template
export const deleteTemplate = async (id: number) => {
  const response = await apiClient.delete(`/email/template/${id}`);
  return response.data;
};

//update template
export const updateTemplate = async (id: number, name : string, status_id : number, json_body : string, html_body : string) => {
  const response = await apiClient.put(`/email/template/${id}`, {
    name : name,
    status_id : status_id,
    json_body : json_body,
    html_body : html_body,
  });
  return response.data;
};
