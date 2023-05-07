import prisma from 'lib/prisma';
import bcrypt from 'bcryptjs';
import { sessionOptions } from 'lib/iron_session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserSafe } from 'lib/types/user';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse) 
  {
  if (req.method === 'POST') {
    const { first_name, last_name, email, password } = req.body;
    try {
      const result = await prisma.user.create({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          password: true
        },
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: await bcrypt.hash(password, 10),
        }})
        try{
          const safeUser: UserSafe = {
            id: result.id,                
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            isLoggedIn: true
          }
          const user = {...result, isLoggedIn: true}
          req.session.userSession = user;
          await req.session.save();
          res.status(200).json(safeUser);
        } catch (error) {
          res.status(500).json({ message: (error as Error).message });
        }
    } catch (error) {
      if((error as PrismaClientKnownRequestError).code === 'P2002'){
        res.json({ message: 'Email already exists' });
      } else{
        console.log(error)
        res.status(500).json({ message: (error as Error).message });
      }
    }
  }
}
