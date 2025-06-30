'use server';
import sgMail from '@sendgrid/mail';
import { readFile } from 'fs';

const getTemplate = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(
      './public/assets/marketing/email-template.html',
      'utf-8',
      (error, content) => {
        if (error) {
          reject(error);
        } else {
          resolve(content);
        }
      }
    );
  });
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export async function sendEmail(formData: FormData) {
  const template = await getTemplate();
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  const msg = {
    to: 'team@doinfine.app',
    from: 'team@doinfine.app',
    subject: 'Someone is interested in Doinfine!',
    html: template
      .replaceAll('{{name}}', rawFormData.name)
      .replaceAll('{{email}}', rawFormData.email)
      .replaceAll('{{message}}', rawFormData.message),
  };

  await sgMail.send(msg);
}
