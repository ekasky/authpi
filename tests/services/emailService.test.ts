import { sendEmail } from '../../src/services/emailService';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

jest.mock('@aws-sdk/client-ses', () => {

    const actual = jest.requireActual('@aws-sdk/client-ses');

    return {
        ...actual,
        SESClient: jest.fn().mockImplementation(() => ({
            send: jest.fn(),
        })),
    }

});

describe('testEmailService', () => {

    const mockSend = (SESClient as jest.Mock).mock.results[0].value.send;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an email using SES', async () => {

        mockSend.mockResolvedValueOnce({}); // simulate successful send

        await sendEmail({
            to: 'test@example.com',
            subject: 'Test Email',
            html: '<p>Hello World</p>',
            text: 'Hello World'
        });

        expect(mockSend).toHaveBeenCalledTimes(1);
        expect(mockSend).toHaveBeenCalledWith(expect.any(SendEmailCommand));

    });

    it('should throw an error if SES client fails', async () => {

        mockSend.mockRejectedValueOnce(new Error('Send failed'));

        await expect(

            sendEmail({
                to: 'test@example.com',
                subject: 'Fail Email',
                html: '<p>Failure</p>',
            })

        ).rejects.toThrow('Send failed');

    });

});