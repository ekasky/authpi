import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../config/env';

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }

const ses = new SESClient({

    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }

});

export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions): Promise<void> => {

    const command = new SendEmailCommand({
        Source: env.EMAIL_FROM,
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Subject: { Data: subject },
            Body: {
                Text: {Data: text ?? ''},
                Html: { Data: html }
            }
        }
    });

    await ses.send(command);

};