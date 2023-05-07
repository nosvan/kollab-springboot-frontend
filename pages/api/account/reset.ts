import prisma from 'lib/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'
import { sealData } from 'iron-session';
import { sessionOptionsMagicLink } from 'lib/iron_session';

export default withIronSessionApiRoute(handle, sessionOptionsMagicLink)

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, locationOrigin } = req.body;
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: email,
        }
      })
      if (result) {
        const seal = await sealData(
          {
            id: result.id,
            email: result.email,
            date: Date.now()
          },
          {
            password: process.env.JWT_SECRET as string
          },
        )
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kollabservice@gmail.com',
            pass: process.env.GMAIL_PASSWORD as string
          }
        });

        const emailBody = `Hi there!
        Please use the following link to login:
        <a href="${locationOrigin as string}/api/account/magiclink?seal=${seal}">Click here to login with link</a>`
        
        const mailOptions = {
          from: 'kollabservice@gmail.com',
          to: result.email,
          subject: 'Kollab: Login with link',
          html: emailBody
        };        
        await transporter.sendMail(mailOptions, (error, info) =>{
          if (error) {
            console.log(error);
            res.status(500).json({ message: (error as Error).message });
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent' });
          }
        });
      } else {
        res.status(200).json({ message: 'Email not found' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
