import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';

export default withIronSessionApiRoute(handle, sessionOptions);

type passcodeFormData = {
  user_id: number;
  list_id: number;
  old_passcode: string;
  passcode: string;
  confirm_passcode: string;
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const passcodeFormData: passcodeFormData = {
        user_id: req.body.user_id,
        list_id: req.body.list_id,
        old_passcode: req.body.old_passcode,
        passcode: req.body.passcode,
        confirm_passcode: req.body.confirm_passcode,
      };
      const listResult = await prisma.list.findFirst({
        where: {
          id: {
            equals: passcodeFormData.list_id,
          },
          passcode: passcodeFormData.old_passcode,
        },
      });
      if (listResult) {
        await prisma.list.update({
          data: {
            passcode: passcodeFormData.passcode,
          },
          where: {
            id: listResult.id,
          },
        });
        const safeResult = {
          id: listResult.id,
          name: listResult.name,
          description: listResult.description,
          owner_id: listResult.owner_id,
          created_at: listResult.created_at,
        };
        return res.status(200).json(safeResult);
      }
      return res.status(404).json(null);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
