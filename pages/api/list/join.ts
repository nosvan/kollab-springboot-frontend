import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import { ListJoin, ListSafe } from 'lib/types/list';


export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'POST'){
    try {
      const newListData: ListJoin = {
        list_id: parseInt(req.body.list_id),
        passcode: req.body.passcode,
        confirm_passcode: req.body.confirm_passcode
      };
      const listResult = await prisma.list.findFirst({
        where: {
          id: {
            equals: newListData.list_id,
          },
          passcode: newListData.passcode,
        }})
      if(listResult){
        await prisma.list_permission.create({
          data: {
            list_id: listResult.id,
            user_id: req.session.userSession.id,
          }
        })
      }
      return res.json(listResult);
    } catch (error) {
      return res.json(error)
    }
  } 
}