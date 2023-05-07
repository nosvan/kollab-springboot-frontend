import { serialize } from 'cookie';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req:NextApiRequest, res:NextApiResponse) {
  if(!req.session.userSession){
    res.json({message: 'Not logged in'})
  } else {
    req.session.destroy()
    const user = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      isLoggedIn: false
    }
    res.json(user)
  }
}
