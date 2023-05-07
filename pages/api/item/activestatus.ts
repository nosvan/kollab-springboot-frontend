import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import { Category, ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest,res: NextApiResponse){
  if(req.method === 'POST'){
    const reqBody = req.body;
    try {
      const result = await prisma.item.findFirst({
        where: {
          id: reqBody.item_id
        }
      })
      if(result){
        const updateResult = await prisma.item.update({
          where: {
            id: result.id
          }, 
          data: {
            active: !reqBody.active
          }
        })
        const resultSafe: ItemSafe = {
          id: updateResult.id,
          name: updateResult.name,
          description: updateResult.description ?? undefined,
          category: updateResult.category ?  Category[updateResult.category.toUpperCase() as keyof typeof Category] : undefined,
          category_id: updateResult.category_id ?? undefined,
          item_type: ItemType[updateResult.item_type.toUpperCase() as keyof typeof ItemType],
          date_tz_sensitive: updateResult.date_tz_sensitive ?? undefined,
          date_tz_sensitive_end: updateResult.date_tz_sensitive_end ?? undefined,
          time_sensitive_flag: updateResult.time_sensitive_flag,
          date_range_flag: updateResult.date_range_flag,
          date_tz_insensitive: updateResult.date_tz_insensitive ?? undefined,
          date_tz_insensitive_end: updateResult.date_tz_insensitive_end ?? undefined,
          permission_level: VisibilityLevel[updateResult.permission_level.toUpperCase() as keyof typeof VisibilityLevel],
          created_by_id: updateResult.created_by_id,
          last_modified_by_id: updateResult.last_modified_by_id,
          active: updateResult.active
        }
        return res.json(resultSafe);
      }
    } catch (error) {
      return res.json(error)
    }
  } 
}