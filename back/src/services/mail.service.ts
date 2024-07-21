import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
            user: 'isabelle.krajcik@ethereal.email',
            pass: 'xXpv8ckE7pqQbXsWdQ', 
            },
        });
    }

    async sendPasswordResetEmail(to: string, token: string) {
        const resetLink = `http://yourapp.com/reset-password?token=${token}`;
        const mailOptions = {
            from: 'Auth-backend service',
            to: to,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
