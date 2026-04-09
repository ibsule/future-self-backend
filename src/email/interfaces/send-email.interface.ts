import { EMAIL_TEMPLATES } from 'src/constants';

export interface ISendEmail {
  emailData: object;
  emailTemplate: EMAIL_TEMPLATES;
  recipientEmail: string;
  recipientName: string;
  emailSubject: string;
}
