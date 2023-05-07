import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'GET'){
    try {
      const {item_id} = req.query;
      const result = await prisma.item.findFirst({
        where: {
          id: parseInt(item_id.toString())
        },
        select: {
          item_permissions: {
            select: {
              user: {
                select: {
                  id: true,
                }
              }
            }
          }
        }
      })
      const resultSafe: {user_id: number}[] = []
      if(result){      
        result.item_permissions.forEach(row=> {
          resultSafe.push({user_id: row.user.id})
        })
      }
      return res.json(resultSafe)
    } catch (error) {
      console.log(error)
      return res.json(error)
    }
  } 
}