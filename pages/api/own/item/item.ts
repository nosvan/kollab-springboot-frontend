import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import { Category as PrismaCategory, VisibilityLevel as PrismaVisibilityLevel} from '@prisma/client';
import { Category, ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'GET'){
    console.log(req.query)
    try {
      const result = await prisma.item.findMany({
        where: {
          created_by_id: req.session.userSession.id,
          category: null,
          permission_level: PrismaVisibilityLevel.private,
          item_permissions: {
            some: {
              user_id: req.session.userSession.id
            }
          }
        },
        orderBy: {
          item_type: 'asc',
        }
      })
      const resultSafe: ItemSafe[] = []
      result.forEach(row=> {
        const itemRow: ItemSafe = {
          id: row.id,
          name: row.name,
          description: row.description ?? undefined,
          category: undefined,
          category_id: undefined,
          item_type: ItemType[row.item_type.toUpperCase() as keyof typeof ItemType],
          date_tz_sensitive: row.date_tz_sensitive ?? undefined,
          date_tz_sensitive_end: row.date_tz_sensitive_end ?? undefined,
          time_sensitive_flag: row.time_sensitive_flag,
          date_range_flag: row.date_range_flag,
          date_tz_insensitive: row.date_tz_insensitive ?? undefined,
          date_tz_insensitive_end: row.date_tz_insensitive_end ?? undefined,
          permission_level: VisibilityLevel[row.permission_level.toUpperCase() as keyof typeof VisibilityLevel],
          created_by_id: row.created_by_id,
          last_modified_by_id: row.last_modified_by_id,
          active: row.active
        }
        resultSafe.push(itemRow)
      })
      return res.json(resultSafe)
    } catch (error) {
      return res.json(error)
    }
  } 
}