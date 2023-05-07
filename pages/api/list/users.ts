import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import { UsersWithPermissionForList } from 'lib/types/list';


export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'GET'){
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },
        where: {
          list_permissions: {
            some: {
              list: {
                id: {
                  equals: parseInt(req.query.list_id.toString())
                }
              }
            }
          }
        }
      })
      const safeResult: UsersWithPermissionForList[] = []
      result.forEach(user => {
        safeResult.push({
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,  
          email: user.email,
        })
      })
      return res.json(safeResult)
    } catch (error) {
      return res.json(error)
    }
  } 
}