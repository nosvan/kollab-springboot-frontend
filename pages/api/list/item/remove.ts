import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import {
  VisibilityLevel as PrismaVisibilityLevel,
  AccessLevel as PrismaAccessLevel,
} from '@prisma/client';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const reqBody = req.body;
      const result = await prisma.item.deleteMany({
        where: {
          OR: [
            {
              id: reqBody.item_id,
              created_by_id: req.session.userSession.id,
            },
            {
              id: reqBody.item_id,
              permission_level: PrismaVisibilityLevel.private,
              item_permissions: {
                some: {
                  user_id: req.session.userSession.id,
                },
              },
            },
            {
              id: reqBody.item_id,
              permission_level: PrismaVisibilityLevel.public,
              list: {
                list_permissions: {
                  some: {
                    permission: PrismaAccessLevel.admin,
                    user_id: req.session.userSession.id,
                  },
                },
              },
            },
          ],
        },
      });
      return res.json(result);
    } catch (error) {
      res.json(error);
    }
  }
}
