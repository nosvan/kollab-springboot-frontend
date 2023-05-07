import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptionsMagicLink } from "lib/iron_session";
import prisma from "lib/prisma";
import { UserSession } from "lib/types/user";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(magicLoginRoute, sessionOptionsMagicLink);

async function magicLoginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id, email, date} : { id: number, email: string, date: number} = await unsealData(req.query.seal as string, {
    password: process.env.JWT_SECRET as string,
  });
  if(Date.now() - date > 1000*60*5) {
    return res.json("expired reset link");
  }
  if (id) {
    const result = await prisma.user.findUnique({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
      },
      where: {
        email: email as string,
      },
    })
    if (result) {
      const userSession: UserSession = {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        password: result.password,
        isLoggedIn: true,
      }
      req.session.userSession = userSession;
      await req.session.save();
      res.redirect(`/settings`)
    }
  }
}