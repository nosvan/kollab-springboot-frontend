import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'lib/iron_session';
import prisma from 'lib/prisma';
import {
  Category,
  EditItem,
  ItemSafe,
  ItemType,
  VisibilityLevel,
} from 'lib/types/item';
import {
  Category as PrismaCategory,
  VisibilityLevel as PrismaVisibilityLevel,
  ItemType as PrismaItemType,
} from '@prisma/client';

export default withIronSessionApiRoute(handle, sessionOptions);

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const reqBody: EditItem = req.body;
      cleanReqBody(reqBody);
      const item_permissions_ids = reqBody.item_permissions.map(
        (item) => item.user_id
      );
      const result = await prisma.item.update({
        where: {
          id: reqBody.id,
        },
        data: {
          name: reqBody.name,
          description: reqBody.description ?? null,
          category: reqBody.category ?? null,
          category_id: reqBody.category_id ?? null,
          item_type:
            PrismaItemType[
              reqBody.item_type.toLowerCase() as keyof typeof PrismaItemType
            ],
          date_tz_sensitive: reqBody.date_tz_sensitive ?? null,
          date_tz_sensitive_end: reqBody.date_tz_sensitive_end ?? null,
          time_sensitive_flag: reqBody.time_sensitive_flag,
          date_range_flag: reqBody.date_range_flag,
          date_tz_insensitive: reqBody.date_tz_insensitive ?? null,
          date_tz_insensitive_end: reqBody.date_tz_insensitive_end ?? null,
          permission_level:
            PrismaVisibilityLevel[
              reqBody.permission_level.toLowerCase() as keyof typeof PrismaVisibilityLevel
            ],
          last_modified_by_id: req.session.userSession.id,
          item_permissions: {
            deleteMany: {
              user_id: {
                notIn: item_permissions_ids,
              },
            },
            createMany: {
              data: reqBody.item_permissions.map((item) => ({
                user_id: item.user_id,
              })),
              skipDuplicates: true,
            },
          },
          active: reqBody.active,
        },
      });
      if (result) {
        const resultSafe: ItemSafe[] = [];
        const ItemSafe: ItemSafe = {
          id: result.id,
          name: result.name,
          description: result.description ?? undefined,
          category: result.category
            ? Category[result.category.toUpperCase() as keyof typeof Category]
            : undefined,
          category_id: result.category_id ?? undefined,
          item_type:
            ItemType[result.item_type.toUpperCase() as keyof typeof ItemType],
          date_tz_sensitive: result.date_tz_sensitive ?? undefined,
          date_tz_sensitive_end: result.date_tz_sensitive_end ?? undefined,
          time_sensitive_flag: result.time_sensitive_flag,
          date_range_flag: result.date_range_flag,
          date_tz_insensitive: result.date_tz_insensitive ?? undefined,
          date_tz_insensitive_end: result.date_tz_insensitive_end ?? undefined,
          permission_level:
            VisibilityLevel[
              result.permission_level.toUpperCase() as keyof typeof VisibilityLevel
            ],
          created_by_id: result.created_by_id,
          last_modified_by_id: result.last_modified_by_id,
          active: result.active,
        };
        resultSafe.push(ItemSafe);
        return res.json(resultSafe);
      } else {
        return res.json([]);
      }
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}

function cleanReqBody(reqBody: EditItem) {
  if (reqBody.time_sensitive_flag) {
    reqBody.date_tz_insensitive = undefined;
    reqBody.date_tz_insensitive_end = undefined;
  } else {
    reqBody.date_tz_sensitive = undefined;
    reqBody.date_tz_sensitive_end = undefined;
  }
  if (!reqBody.date_range_flag) {
    reqBody.date_tz_sensitive_end = undefined;
    reqBody.date_tz_insensitive_end = undefined;
  }
}
