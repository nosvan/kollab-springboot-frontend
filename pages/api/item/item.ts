import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import { Category, ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'GET'){
    try {
      const {item_id} = req.query;
      const result = await prisma.item.findFirst({
        where: {
          id: parseInt(item_id.toString())
        }
      })
      if(result){
        const resultSafe: ItemSafe = {
          id: result.id,
          name: result.name,
          description: result.description ?? undefined,
          category: result.category ?  Category[result.category.toUpperCase() as keyof typeof Category] : undefined,
          category_id: result.category_id ?? undefined,
          item_type: ItemType[result.item_type.toUpperCase() as keyof typeof ItemType],
          date_tz_sensitive: result.date_tz_sensitive ?? undefined,
          date_tz_sensitive_end: result.date_tz_sensitive_end ?? undefined,
          time_sensitive_flag: result.time_sensitive_flag,
          date_range_flag: result.date_range_flag,
          date_tz_insensitive: result.date_tz_insensitive ?? undefined,
          date_tz_insensitive_end: result.date_tz_insensitive_end ?? undefined,
          permission_level: VisibilityLevel[result.permission_level.toUpperCase() as keyof typeof VisibilityLevel],
          created_by_id: result.created_by_id,
          last_modified_by_id: result.last_modified_by_id,
          active: result.active
        }
        return res.json(resultSafe)
      }
    } catch (error) {
      return res.json(error)
    }
  } 
}