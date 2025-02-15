import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import ForgotPasswordEmail from '@/components/Email/ForgotPassword';
import React from 'react';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { recipient, resetLink } = await req.json();

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('ip') || 'IP not available';

    const emailHtml = await render(React.createElement(ForgotPasswordEmail, { resetLink, ip }));

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipient,
      subject: 'Password Reset Request',
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully', info }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
  }
};
