import prisma from 'lib/prisma'
import bcrypt from 'bcryptjs';
import { sessionOptions } from 'lib/iron_session';
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const result = await prisma.user.findUnique({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      password: true,
    },
    where: {
      email: email,
    },
  })
  if(result){
    const isValid = await bcrypt.compare(password, result.password);
    if(isValid){
      console.log('Valid credentials: ', result.email);
      const user = {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        password: result.password,
        isLoggedIn: true
      }
      const safeUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isLoggedIn: user.isLoggedIn
      }
      try{
        req.session.userSession = user;
        await req.session.save();
        console.log(safeUser);
        return res.json(safeUser);
      } catch (error) {
       return res.status(500).json({ message: (error as Error).message });
      }
    } else {
      console.log('Invalid credentials: ', email);
      return res.json({ error: 'Invalid credentials' })
    }
  } else {
    console.log('Invalid credentials: ', email);
    return res.json({ error: 'Invalid credentials' })
  }
}
