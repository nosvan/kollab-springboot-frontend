import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/iron_session";
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSafe, UserSession } from "../../../lib/types/user";

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {cookies} = req;
  const t0k3n = cookies['iron-session-token'];
  const user: UserSafe = {
    id: -999,
    first_name: '',
    last_name: '',
    email: '',
    isLoggedIn: false
  }
  if(!t0k3n){
    return res.status(401).json(user);
  }
  try {
    const userFromSession: UserSession = req.session.userSession
    const result = await prisma.user.findUnique({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true
      },
      where: {
        email: userFromSession.email
      }
    });
    if(userFromSession.password === result?.password){
      const safeUser: UserSafe = {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        isLoggedIn: true
      }
      return res.status(200).json(safeUser);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json(user);
  }
}